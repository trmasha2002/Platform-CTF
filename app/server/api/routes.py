from flask import Blueprint, session, g

from app.server.api.controllers.DeleteTaskController import DeleteTaskController
from app.server.api.controllers.DeleteTeamMemberController import DeleteTeamMemberController
from app.server.api.controllers.GetMapObjectsController import GetMapObjectsController
from app.server.api.controllers.ChangeTeamInfoControllers import *
from app.server.api.controllers.GetTeamsController import *
from app.server.api.controllers.AddTournament import AddTournamentController
from app.server.api.controllers.JoinAndLeaveTeamControllers import *
from app.server.api.controllers.GetAndChangeTeamInviteCode import *
from app.server.api.controllers.TournamentController import TournamentController, TournamentReg, TournamentDisReg
from app.server.api.controllers.AllActiveTournaments import AllActiveTournamentsController
from app.server.api.controllers.Logout import Logout
from app.server.api.controllers.AddTournament import AddTournamentController
from app.server.api.models import User
from app.server.main.routes import main
from .controllers.GetScoreController import GetScoreController
from .controllers.IsAuthController import IsAuthController
from app.server.api.controllers.RegController import RegController
from app.server.api.controllers.LoginController import LoginController
from app.server.api.controllers.ConfirmCodeController import ConfirmCodeController
from app.server.api.controllers.CreateTeamController import CreateTeamController
from app.server.api.controllers.PasswordResetController import PasswordResetController
from app.server.api.controllers.CreateTaskController import CreateTaskController
from app.server.api.controllers.Kek import KekController
from app.server.api.controllers.ChangeProfileInfoControllers import ChangeEmailController, ChangePasswordController, ChangeSurnameController, ChangeNameController
from app.server.api.controllers.GetUserInformationController import GetUserInformationController
from app.server.api.controllers.TaskController import TaskController, GetTasksByTournament, GetTask, EditTask
from app.server.api.controllers.GetAllTasksForTournament import GetAllTasksForTournament
import app.server.api.WebSocketHandlers.ScoreboardWSController
from app.server.api.controllers.ChangeInfoTourController import ChangeInfoController
from app.server.api.controllers.DeleteTournament import DeleteTournamentController
from app.server.api.controllers.WriteMessagesController import WriteMessageController
from app.server.api.controllers.DeleteTaskController import DeleteTaskController
api = Blueprint('api', __name__, template_folder='../../../static', static_folder='../../../static')

api.add_url_rule('/gettasks', view_func=GetAllTasksForTournament.as_view('get_tasks_for_tournament'))
api.add_url_rule('/register', view_func=RegController.as_view('get_form'))
api.add_url_rule('/getscore', view_func=GetScoreController.as_view('getscore'))
api.add_url_rule('/user/is_auth', view_func=IsAuthController.as_view('is_auth'))
api.add_url_rule('/login', view_func=LoginController.as_view("login"))
api.add_url_rule('/confirm', view_func=ConfirmCodeController.as_view("confirm"))
api.add_url_rule('/logout', view_func=Logout.as_view("logout"))
api.add_url_rule('/tournament/create', view_func=AddTournamentController.as_view("create_tournament"))

api.add_url_rule('/team/create', view_func=CreateTeamController.as_view('create_team'))
api.add_url_rule('/teams/<int:team_id>/code/change',
                 view_func=ChangeTeamInviteCodeController.as_view('change_team_code'))
api.add_url_rule('/teams/<int:team_id>/code', view_func=GetTeamInviteLinkController.as_view('get_team_invite_link'))
api.add_url_rule('/teams/<int:team_id>/leave', view_func=LeavingTheTeamController.as_view('leave_team'))
api.add_url_rule('/teams', view_func=GetAllTeamsController.as_view('get_teams'))
api.add_url_rule('/teams/<int:team_id>', view_func=GetTeamController.as_view('get_team'))
api.add_url_rule('/teams/<int:team_id>/members', view_func=GetTeamMembersController.as_view('get_team_members'))
api.add_url_rule('/teams/<int:id>/name/change', view_func=ChangeTeamNameController.as_view('change_team_name'))
api.add_url_rule('/teams/<int:id>/city/change', view_func=ChangeTeamCityController.as_view('change_team_city'))
api.add_url_rule('/teams/<int:team_id>/delete/<int:user_id>',
                 view_func=DeleteTeamMemberController.as_view('delete_team_member'))

api.add_url_rule('/forgetpass', view_func=PasswordResetController.as_view('reset_password'))
api.add_url_rule('/createtask', view_func=CreateTaskController.as_view('create_task'))
api.add_url_rule('/kek/<id>', view_func=KekController.as_view('kek'))
api.add_url_rule('/user/<id>', view_func=GetUserInformationController.as_view('get_user_information'))
api.add_url_rule('/changename', view_func=ChangeNameController.as_view('changename'))
api.add_url_rule('/changesurname', view_func=ChangeSurnameController.as_view('changesurname'))
api.add_url_rule('/changeemail', view_func=ChangeEmailController.as_view('changeemail'))
api.add_url_rule('/changepass', view_func=ChangePasswordController.as_view('changepass'))
api.add_url_rule('/tournaments/all', view_func=AllActiveTournamentsController.as_view('all_tournaments'))
api.add_url_rule('/taskupload', view_func=TaskController.as_view('upload_task'))
api.add_url_rule('/tournaments/<tournament_id>', view_func=TournamentController.as_view('get_tournament'))
api.add_url_rule('/tournaments/private', view_func=TournamentController.as_view('get_tournament_private'))
api.add_url_rule('/tournaments/<tournament_id>/tasks', view_func=GetTasksByTournament.as_view('get_tournament_tasks'))
api.add_url_rule('/tournaments/<id>/edit', view_func=ChangeInfoController.as_view('change_tournament'))
api.add_url_rule('/tournaments/<id>/reg', view_func=TournamentReg.as_view('reg_tour_contestant'))
api.add_url_rule('/tournaments/<id>/disreg', view_func=TournamentDisReg.as_view('disreg_tour_contestant'))
api.add_url_rule('/tasks/<task_id>', view_func=GetTask.as_view('get_task'))
api.add_url_rule('/edit_task/<id>', view_func=EditTask.as_view('edit_task'))
api.add_url_rule('/tournaments/<id>/delete', view_func=DeleteTournamentController.as_view('delete_tournament'))
api.add_url_rule('/tournaments/<tournament_id>/message', view_func=WriteMessageController.as_view('addmessage'))
api.add_url_rule('/getmapobjects', view_func=GetMapObjectsController.as_view('get_obj'))
api.add_url_rule('/tournaments/<tournament_id>/tasks/<task_id>/delete', view_func=DeleteTaskController.as_view('deletetask'))
@api.before_request
@main.before_request
def load_user():
    user = None
    if session.get("id"):
        user = User.query.filter_by(id=session["id"]).first()
    g.user = user

