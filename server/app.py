from config import app, db, api, bcrypt
# Add your model imports
from models import Sneaker, User, Review
from flask_restful import Resource
from flask import make_response, jsonify, request, session
import os

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
            email = data['email'],
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
        reviews_dict_list = [review.to_dict() for review in reviews]
        return make_response (reviews_dict_list)
    
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

api.add_resource(Reviews, '/reviews')




class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")

        user = User.query.filter_by(username = username).first()
        

        if user:
            if user.authenticate(password):
                print(user.id)
                session['user_id'] = user.id
                return user.to_dict(), 200
        else:
            return {'error': 'Invalid Credentials'}, 401
        
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Logout, '/logout')








if __name__ == '__main__':
    app.run(port=5557, debug=True)

