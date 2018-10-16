from flask.views import MethodView

from app.server.api.models.user import User
from app.server.helpers import *
from flask import request, abort, session


class IsAuthController(MethodView):
    @staticmethod
    def post():
        if 'id' in session and session['id'] and User.is_exist_by_id(session['id']):
            user_state = {'id': session['id'], 'username': session['username'], 'loading': False, 'team_id': session['team_id']}
            return return_ok_status(user_state)
        session.pop('id', None)
        session.pop('team_id', None)
        session.pop('username', None)
        user_state = {'id': None, 'login': None, 'loading': False}
        return return_bad_status(user_state)
