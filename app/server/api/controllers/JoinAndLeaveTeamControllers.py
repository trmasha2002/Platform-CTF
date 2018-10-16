from flask import request
from flask.views import MethodView

from app.server.api.models import Team
from app.server.helpers import *


class JoiningTheTeamController(MethodView):
    def get(self):
        code = request.args.get('code', '')
        team = Team.get_by_code(code)

        if not team:
            return return_bad_status('Неверный код приглашения')

        user = get_user()

        if team.if_user_in_the_team(user) or user.team_id:
            return return_bad_status('Вы уже присоединены к команде')

        team.add_new_member(user)
        return return_ok_status('Вы присоединились к команде')


class LeavingTheTeamController(MethodView):
    def get(self, team_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user = get_user()

        if not team.if_user_in_the_team(user):
            return return_bad_status('Вы уже/еще не в команде')

        if user.id == team.creator_id:
            return return_bad_status('Вы не можете покинуть команду')

        team.remove_member(user)
        return return_ok_status('Вы покинули команду')
