from config import app, db, api, bcrypt, CORS
# Add your model imports
from models import Sneaker, User, Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from flask import make_response, jsonify, request, session
import os
from flask_login import login_user
from werkzeug.security import check_password_hash
from flask_login import LoginManager, current_user, login_user, login_required, logout_user
import jwt
import datetime

login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Sneakers (Resource):
    def get(self):
        sneakers = Sneaker.query.all()
        sneakers_dict_list = [sneaker.to_dict( rules= ()) for sneaker in sneakers]
        return make_response (sneakers_dict_list)
    
api.add_resource (Sneakers, '/sneakers')

class SneakerByID(Resource):
    def get(self,id):
        sneaker = Sneaker.query.filter_by(id=id).first()
        if not sneaker:
            return make_response({"error": "sneaker not found"}, 404)
        return make_response(sneaker.to_dict())
    
api.add_resource(SneakerByID, '/sneakers/<int:id>')



class Users (Resource):
    def get (self):
        users = User.query.all()
        users_dict_list = [user._to_dict_(rules = ()) for user in users]
        if len(users) == 0:
            return make_response({'error': 'no Users'}, 404)
        return make_response(users_dict_list,200)
    
    def post (self):
        data = request.get_json()
        newUser = User(
            username= data["username"],
            password = data["password"],
            )
        try:
            db.session.add(newUser)
            db.session.commit()
            return make_response (newUser.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)
    
api.add_resource(Users, '/users')

class Reviews (Resource):
    def get(self):
        reviews = Review.query.all()
        r_dict = [r.to_dict() for r in reviews]
        return make_response(r_dict, 200)
    
    def post (self):
        data = request.get_json()
        try:
            review = Review(
                rating = data['rating'],
                review=data['review'],
                sneaker_id = data ['sneaker_id'],
                user_id = data ['user_id']
            )
        except ValueError as value_error:
            return make_response({"errors": [str(value_error)]}, 422)
        
        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(),201)

api.add_resource(Reviews,'/reviews')



class CheckUser(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

users = []
from flask_restful import Resource
from flask import request

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
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create a new user object
        new_user = User(username=username, password_hash=hashed_password, location=location)

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
            app.logger.info("Password check successful. Generating token...")

            token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                               app.secret_key,
                               algorithm='HS256')
            return {'token': token}
        
        app.logger.info("Login failed.")
        return {'message': 'Invalid username or password'}, 401



api.add_resource(Login, '/login')
    
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {'message': '401: Unauthorized'}, 401

class Logout(Resource):
    def get(self):
        session.pop('user_id', None)
        return make_response({'message': 'You have been logged out!'}, 200)
    


class UserReviews(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user_reviews = Review.query.filter_by(user_id=current_user_id).all()
        reviews_data = [{"id": review.id, "content": review.content} for review in user_reviews]
        return reviews_data, 200

api.add_resource(UserReviews, '/user/reviews')
    
api.add_resource(Signup, '/signup')    
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(CheckUser, '/check_user')
    



if __name__ == '__main__':
    app.run(port=5558, debug=True)

