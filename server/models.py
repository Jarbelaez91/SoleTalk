from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from flask_restful import Api
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt


class Sneaker(db.Model, SerializerMixin):
    __tablename__ = 'sneakers'

    serialize_rules = ('-reviews',)

    id = db.Column(db.Integer, primary_key=True)
    name_of_sneaker = db.Column(db.String, nullable=False)
    category = db.Column(db.String)
    name_of_brand = db.Column(db.String)

    reviews = db.relationship( 'Review', back_populates = 'sneaker', cascade = 'all, delete-orphan' )
    users = association_proxy( 'reviews', 'user' )



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(100))
    
    reviews = db.relationship('Review', back_populates='user')
    sneakers = association_proxy('reviews', 'sneaker')
    def __init__(self, username, password, location):
        self.username = username
        self.password = password
        self.location = location

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
        }

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password.encode("utf-8")).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))

    
    

class Review (db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('id', 'rating', 'review', 'user', 'sneaker')

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float)
    review=db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sneaker_id = db.Column(db.Integer, db.ForeignKey('sneakers.id'))
   

    sneaker = db.relationship( 'Sneaker', back_populates = 'reviews' )
    user = db.relationship( 'User', back_populates = 'reviews' )

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'review': self.review,
            'user_id': self.user_id,
            'sneaker_id': self.sneaker_id,
        }
