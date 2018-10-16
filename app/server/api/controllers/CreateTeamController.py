from flask_wtf import FlaskForm
from .FormController import FormController
from app.server.helpers import *

from app.server.api.forms.CreateTeamForm import CreateTeamForm
from app.server.api.models.team import Team

import random
import string
from app.server.helpers.auth import *


class CreateTeamController(FormController):
    def get_form(self) -> FlaskForm:
        return CreateTeamForm()

    @login_required
    def process(self, form: FlaskForm):
        if "team_id" in session and session["team_id"] != "null" and session["team_id"] != None:
            return return_bad_status("You can't join several teams the same time. You are already in team: {}".format(session["team_id"]))
        user = get_user()
        invite_code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=8))

        team = Team(form.name.data, form.city.data, invite_code, user)
        session["team_id"] = team.save()
        return return_ok_status('Команда успешно создана')
