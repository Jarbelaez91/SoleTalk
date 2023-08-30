from flask import Flask, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from flask_session import Session
from flask_cors import CORS
# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem' 
Session(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)
bcrypt = Bcrypt(app)

app.secret_key = '\xdf!`\xc71\xc0\x91\x17p\xb6\xd0A\xcc/NG\x13=\x1aZ\xc7\xc4\x87\x87'
login_manager = LoginManager(app)



