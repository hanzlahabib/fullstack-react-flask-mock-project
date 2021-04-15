from flask import Blueprint, request, jsonify, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from . import db
from .models import Users

auth = Blueprint('auth', __name__)


@auth.route('/api/authenticate/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    user = Users.query.filter_by(username=username).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user:
        return make_response(jsonify({"message": "User does not exist"}))
    if not check_password_hash(user.password, password):
        return make_response(jsonify({"message": "Invalid Password"}))
    # if the above check passes, then we know the user has the right credentials, now create JWT
    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow(
    )+datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    return make_response(jsonify({"message": "Successfully login", "token": token}), 200)


@auth.route('/api/authenticate/register', methods=['POST'])
def signup():
    username = request.form.get('username')
    roles = request.form.get('roles')
    password = request.form.get('password')
    # if this returns a user, then the username already exists in database
    user = Users.query.filter_by(username=username).first()
    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        user_data = {}
        user_data["username"] = user.username
        user_data["id"] = user.id
        # user_data["password"] = user.password
        user_data["roles"] = user.roles
        return make_response(jsonify({"message": "User Already Exist", "user": user_data}), 200)

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = Users(username=username, roles=roles,
                     password=generate_password_hash(password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User Created successfully'}), 200
