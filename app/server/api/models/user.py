from app.server import db, ma
from flask import session
from .contestant import *
from hashlib import sha256
import random


class User(Contestant):
    id = db.Column(db.Integer, db.ForeignKey('contestant.id'), primary_key=True)
    name = db.Column(db.String(256))
    surname = db.Column(db.String(256), nullable=True)
    email = db.Column(db.String(256))
    login = db.Column(db.String(256))
    password = db.Column(db.String(256))
    code = db.Column(db.String(256))
    phone = db.Column(db.String(256), nullable=True)
    photo = db.Column(db.String(20), nullable=True)
    is_confirmed = db.Column(db.Boolean(), default=False)
    __mapper_args__ = { 'polymorphic_identity': 'user' }

    def __init__(self, name, email, login, password, code):
        self.type = 'user'
        self.name = name
        self.email = email
        self.login = login
        self.password = password
        self.code = code

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    @staticmethod
    def get_user_by_id(user_id):
        return db.session.query(User).filter(User.id == user_id).first()

    @staticmethod
    def last_id():
        return db.session.query(User.id).order_by(User.id.desc()).first()

    @staticmethod
    def get_users():
        return User.query.all()

    @staticmethod
    def is_exist_by_id(id):
        if User.query.filter(User.id == id).first():
            return True
        return False

    @staticmethod
    def update_by_login(login, key, value):
        db.session.query(User).filter(User.login == login).update({key: value}, synchronize_session='evaluate')
        db.session.commit()

    @staticmethod
    def change_password_by_email(email, password):
        secret_password = sha256(password.encode()).hexdigest()
        User.query.filter(User.email == email).update(dict(password=secret_password))
        db.session.commit()

    @staticmethod
    def user_auth():
        if session['logged_in'] and 'username' in session:
            return True
        return False

    @staticmethod
    def get_all():
        return User.query.all()



    @staticmethod
    def get_id_from_login(s):
        return db.session.query(User.id).filter(User.login == s)
    __mapper_args__ = {
        'polymorphic_identity': 'user'
    }

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
