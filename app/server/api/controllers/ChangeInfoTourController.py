# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from .FormController import FormIDController
from app.server.api.forms.ChangeTournamentInfo import ChangeInfoForm
from app.server.api.models import User, Tournament
from app.server.helpers import return_ok_status, return_bad_status, is_auth


class ChangeInfoController(FormIDController):
    def get_form(self) -> FlaskForm:
        return ChangeInfoForm()

    def process(self, form: FlaskForm, tournament_id):
        if not is_auth():
            return return_bad_status("Вы не авторизованы!")

        Tournament.update_by_id(tournament_id, 'name', form.name.data)
        Tournament.update_by_id(tournament_id, 'description', form.description.data)
        Tournament.update_by_id(tournament_id, 'private', bool(int(form.private.data)))
        Tournament.update_by_id(tournament_id, 'platform', bool(int(form.platform.data)))
        Tournament.update_by_id(tournament_id, 'time', form.time.data)
        Tournament.update_by_id(tournament_id, 'time_to_live', form.time_to_live.data)
        Tournament.update_by_id(tournament_id, 'place', form.place.data)
        Tournament.update_by_id(tournament_id, 'online', bool(int(form.online.data)))
        Tournament.update_by_id(tournament_id, 'for_team_allowed', bool(int(form.for_team_allowed.data)))
        return return_ok_status('Все изменено.')
