# -*- coding: utf-8 -*-
from flask.views import MethodView
from app.server.helpers import *


class Logout(MethodView):
    def post(self):
        if is_auth():
            session.pop('username', None)
            session.pop('id', None)
            return return_ok_status('good')
        return return_bad_status('bad')
