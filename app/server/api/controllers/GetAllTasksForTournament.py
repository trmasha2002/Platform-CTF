from flask.views import MethodView
from app.server.helpers import *
from app.server.helpers.auth import login_required
from app.server.api.models import Task, TaskSchema, TournamentsToObject, Tournament
from flask import request

class GetAllTasksForTournament(MethodView):

    @login_required
    def get(self):
        tournament_id = int(request.args['tournament_id'])
        tournament = Tournament.get_info(tournament_id)
        contestant_id = g.user.id
        if not tournament.for_team_allowed and g.user.teams:
            contestant_id = g.user.teams[0]
        tournament_to_object = TournamentsToObject.get_one_or_none(tournament_id, contestant_id)
        if not tournament_to_object:
            return return_bad_status("Ты должен войти в турнир чтобы сдать таск")


        tasks = Task.dump_all_tasks_for_tournament_by_categories(tournament_id)
        tasks = [{'category' : key, 'tasks' : TaskSchema(exclude=('flag')).dump(value, many=True).data} for key, value in tasks.items()]

        solved  = tournament_to_object.get_solved_tasks_for_tournament_for_contestant_indices()
        solved = [x[0] for x in solved]
        return return_ok_status({'tasks': tasks, 'solved': solved})
