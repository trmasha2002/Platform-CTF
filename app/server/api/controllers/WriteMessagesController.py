from flask import session
from app.server import db
from app.server.api.models import Tournament
from app.server.api.controllers.Permissions import PermissionMixin
from .FormController import FormIDController
from flask_wtf import FlaskForm
from app.server.api.forms import AddMessageForm
from app.server.helpers import return_bad_status, return_ok_status, is_auth, get_user


class WriteMessageController(PermissionMixin, FormIDController):

    def check_permissions(self, *args, **kwargs):
        contest_id = kwargs.get('id', -1)
        return db.session.query(Tournament.creator_id).filter(Tournament.id == contest_id) == get_user().id

    def get_form(self) -> FlaskForm:
        return AddMessageForm()

    def process(self, form: FlaskForm, tournament_id):
        if not is_auth():
            return return_bad_status("Вы не авторизованы!")

        message = (form.text.data, form.tournament.data)
        message.creator_id = session['username']
        message.save()
        return return_ok_status('Сообщение отправлено!')
