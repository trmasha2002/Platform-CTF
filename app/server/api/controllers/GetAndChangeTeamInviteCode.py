import random
import string

from flask.views import MethodView
from app.server import db
from app.server.api.models import Team, User
from app.server.helpers import *
from config import APP_URL


class GetTeamInviteLinkController(MethodView):
    def get(self, team_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user_id = session['id']
        if team.creator_id != user_id:
            return return_bad_status('Вы не имеете доступа к ссылке приглашения в команду')

        return return_ok_status('{}/team/join?code={}'.format(APP_URL, team.invite_code))


class ChangeTeamInviteCodeController(MethodView):
    def get(self, team_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user_id = session['id']
        if team.creator_id != user_id:
            return return_bad_status('Вы не имеете доступа к ссылке приглашения в команду')

        new_invite_code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=8))
        team.invite_code = new_invite_code
        db.session.commit()

        return return_ok_status('Код приглашения изменен')
