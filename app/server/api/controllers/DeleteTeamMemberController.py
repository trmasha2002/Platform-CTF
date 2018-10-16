from flask.views import MethodView

from app.server.api.models import Team
from app.server.helpers import *


class DeleteTeamMemberController(MethodView):
    def get(self, team_id, user_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user = get_user()
        if user != team.creator:
            return return_bad_status('Вы не имеете прав редактировать команду')

        if user_id == user.id:
            return return_bad_status('Вы не можете удалить себя из команды')

        user = User.get_user_by_id(user_id)
        team.remove_member(user)

        return return_ok_status('Вы удалили человека из команды')