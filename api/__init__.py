from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()
ma = Marshmallow()


def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    # app.config['SQLALCHEMY_ECHO'] = True

    db.init_app(app)
    ma.init_app(app)

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/')

    from .setup import loadcsv, setup
    app.cli.add_command(loadcsv)
    app.cli.add_command(setup)
    return app
