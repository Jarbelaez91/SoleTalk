from config import app, db, api, bcrypt
# Add your model imports
from flask_cors import CORS
from models import Sneaker, User, Review
from flask_restful import Resource, reqparse
from flask import make_response, jsonify, request, session
import os
from flask_login import login_user
from werkzeug.security import check_password_hash
from flask_login import LoginManager, current_user, login_user, login_required, logout_user
import datetime
from flask_login import login_required

login_manager = LoginManager(app)
login_manager.login_view = 'login'

CORS(app, origins=['http://localhost:3000'], supports_credentials=True)

bcrypt.init_app(app)
@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Sneakers (Resource):
    def get(self):
        sneakers = Sneaker.query.all()
        sneakers_dict_list = [sneaker.to_dict( rules= ()) for sneaker in sneakers]
        return make_response(jsonify(sneakers_dict_list), 200)
    
    def post(self):
        data = request.get_json()
        new_sneaker = Sneaker(
            name_of_sneaker=data['name_of_sneaker'],
            name_of_brand=data['name_of_brand'],
            category=data['category']
        )
        db.session.add(new_sneaker)
        db.session.commit()
        return make_response(new_sneaker.to_dict(), 201)
    
api.add_resource (Sneakers, '/sneakers')

class SneakerByID(Resource):
    def get(self, id):
        sneaker = Sneaker.query.get(id)
        if not sneaker:
            return make_response({"error": "Sneaker not found"}, 404)
        return make_response(sneaker.to_dict(), 200)

api.add_resource(SneakerByID, '/sneakers/<int:id>')



class Users(Resource):
    def get(self, username=None):
        users_dict_list = []  # Define outside of if blocks
        if username is None:
            users = User.query.all()
            users_dict_list = [user.to_dict() for user in users]
            if len(users) == 0:
                return make_response(jsonify({'error': 'no Users'}), 404)
            return make_response(jsonify(users_dict_list), 200)  # Use make_response(jsonify(...))
        else:
            user = User.query.filter_by(username=username).first()
            if user:
                return make_response(jsonify(user.to_dict()), 200)  # Use make_response(jsonify(...))
            else:
                return make_response(jsonify({'error': 'User not found'}), 404)  # Use make_response(jsonify(...))


    
    def post(self):
        data = request.get_json()
        newUser = User(
            username=data["username"],
            password=data["password"],
        )
        try:
            db.session.add(newUser)
            db.session.commit()
            return jsonify(newUser.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'{repr(e)}'}), 422

api.add_resource(Users, '/users', '/users/<string:username>')


def log_request_info(func):
    def wrapper(*args, **kwargs):
        app.logger.info(f'Request: {request.method} {request.url}')
        app.logger.info(f'Request data: {request.data}')
        app.logger.info(f'Request JSON: {request.get_json()}')
        return func(*args, **kwargs)
    return wrapper

class Reviews(Resource):
    def post(self):
        data = request.get_json()

        try:
            new_review = Review(
                rating=data['rating'],
                review=data['review'],
                sneaker_id=data['sneaker_id'],
                user_id=data['user_id']
            )
        except KeyError as key_error:
            return {"error": f"Missing or incorrect field: {str(key_error)}"}, 400

        db.session.add(new_review)
        db.session.commit()

        response_data = new_review.to_dict()
        response_data['id'] = new_review.id

        return response_data, 201

    def get(self):
        reviews = Review.query.all()
        reviews_dict_list = [review.to_dict() for review in reviews]
        return jsonify (reviews_dict_list)

api.add_resource(Reviews, '/reviews')

class ReviewsById(Resource):
    def get(self, review_id):
        review = Review.query.get(review_id)
        if review:
            return review.to_dict(), 200
        else:
            return make_response({'error': 'Review not found'}, 404)

    def patch(self, review_id):
        data = request.get_json()

        review = Review.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        try:
            if 'rating' in data:
                review.rating = data['rating']
            if 'review' in data:
                review.review = data['review']

            db.session.commit()
            return review.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    def delete(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        try:
            db.session.delete(review)
            db.session.commit()
            return {"message": "Review deleted successfully"}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

api.add_resource(ReviewsById, '/reviews/<int:review_id>')




class CheckUser(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                user_data = user.to_dict()
                return jsonify(user_data), 200
        return {'message': '401 Unauthorized'}, 401


class Signup(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
        parser.add_argument("location", type=str, required=True)
        data = parser.parse_args()

        username = data["username"]
        password = data["password"]
        location = data["location"]

        # Check if the username already exists
        if User.query.filter_by(username=username).first():
            return {"message": "Username already exists"}, 400

        # Hash the password using bcrypt
        # hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create a new user object
        new_user = User(username=username, password=password, location=location)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201


        
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        app.logger.info(f"Received login request for username: {username}")

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            app.logger.info("Password check successful. Logging in...")

            session['user_id'] = user.id
            return {'message': 'Logged in successfully'}
        
        app.logger.info("Login failed.")
        return {'message': 'Invalid username or password'}, 401

api.add_resource(Login, '/login')
    

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                user_data = user.to_dict()
                return jsonify(user_data), 200
        return {'message': '401 Unauthorized'}, 401

class Logout(Resource):
    def get(self):
        session.pop('user_id', None)
        return {'message': 'You have been logged out!'}, 200

    

class UserReviews(Resource):
    @login_required
    def get(self):
        user_id = session.get('user_id')
        user_reviews = Review.query.filter_by(user_id=user_id).all()
        reviews_data = [{"id": review.id, "rating": review.rating, "review": review.review} for review in user_reviews]
        return jsonify(reviews_data), 200


api.add_resource(UserReviews, '/user/reviews')
    
api.add_resource(Signup, '/signup')    
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(CheckUser, '/check_user')
    

if __name__ == '__main__':
    app.run(port=5558, debug=True)

