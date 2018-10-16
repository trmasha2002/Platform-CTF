from flask import jsonify, session, g
from flask_marshmallow import fields

from app.server.api.models.user import User


def return_ok_status(result):
    return jsonify({"status": "ok", "result": result})


def return_bad_status(result):
    return jsonify({"status": "bad", "result": result})


def is_auth():
    if 'id' in session and session['id'] and User.is_exist_by_id(session['id']):
        return True
    return False


def get_user():
    return g.user