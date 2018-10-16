from app.server.api.models.Tournament import Tournament
from app.server.api.models.task import Task
from flask.views import MethodView
from app.server.helpers import return_ok_status, return_bad_status, is_auth
from app.server import db
from flask import session, g

class DeleteTaskController(MethodView):
    def post(self, tournament_id, task_id):
        task = Task.get_by_id(task_id)
        tournament = task.tournament
        creator_id = tournament.creator_id
        if session['id'] != creator_id:
            return return_bad_status('Вы не создатель турнира!')
        if not is_auth():
            return return_bad_status('Вы не авторизованы!')

        Task.query.filter(Task.id == task_id).delete()
        db.session.commit()
        return return_ok_status('Задача успешно удалена!')
