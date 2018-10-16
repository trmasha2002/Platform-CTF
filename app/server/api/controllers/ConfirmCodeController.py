# -*- coding: utf-8 -*-

from flask import request
from flask.views import MethodView
from app.server import db
from app.server.api.models.user import User
from app.server.helpers import return_ok_status, return_bad_status


class ConfirmCodeController(MethodView):
    def get(self):
        code = request.args.get('code')
        user = db.session.query(User).filter(User.code == code)
        if user.count():
            if user[0].is_confirmed:
                return return_bad_status("Вы уже подтвердили свою учетную запись!")
            user[0].is_confirmed = True
            user[0].code = None
            db.session.commit()
            return return_ok_status("Вы успешно подтвердили свою учетную запись!")
        return return_bad_status('Неверный код подтверждения!')
