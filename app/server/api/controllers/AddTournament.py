from app.server.api.models.Tournament import Tournament
from flask_wtf import FlaskForm
from .FormController import FormController
from app.server.helpers import return_ok_status, return_bad_status, is_auth
from app.server.api.forms.AddTournamentForm import AddTournamentForm
from flask import session
import random
import string
from app.server.api.models import User


class AddTournamentController(FormController):
    def get_form(self) -> FlaskForm:
        return AddTournamentForm()

    def process(self, form: FlaskForm):
        if not is_auth():
            return return_bad_status("Вы не авторизованы!")

        user_id = session['id']
        user = User.get_user_by_id(user_id)
        time = form.time.data
        time_to_live = form.time_to_live.data
        link = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(32))
        tour = Tournament(form.name.data, form.description.data, user, time, time_to_live,
                          form.place.data, link, bool(int(form.private.data)), bool(int(form.platform.data)), bool(int(form.online.data)),
                          bool(int(form.for_team_allowed.data)))
        last = tour.add()
        return return_ok_status(last)
