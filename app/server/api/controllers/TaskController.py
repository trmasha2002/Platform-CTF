# -*- coding: utf-8 -*-
import unittest
from flask import session, g
from flask_wtf import FlaskForm
import random
from flask.views import MethodView

from app.server.api.forms.TaskForm import TaskForm
from ..WebSocketHandlers.ScoreboardWSController import send_scoreboard_to_room

from .FormController import FormController, FormIDController
from app.server import db
from app.server.helpers import return_ok_status, return_bad_status
from datetime import datetime
from app.server.api.forms.PassTaskForm import PassTaskForm
from app.server.api.models.task import Task, TaskSchema
from app.server.api.models.Attemps import Attempt
from app.server.api.models.Tournament import Tournament
from app.server.api.models.TournametsToObjects import TournamentsToObject
from app.server.api.models.team import Team
from app.server.api.models.UserToTeam import user_to_team
from app.server.api.models.user import User
from app.server.helpers.auth import login_required

class TaskController(FormController):
    def get_form(self) -> FlaskForm:
        return PassTaskForm()

    @login_required
    def process(self, form: FlaskForm):
        task_id = int(form.id.data)
        tournament_id = int(form.tournament_id.data)
        task = Task.get_by_id(task_id)
        tournament = Tournament.get_info(tournament_id)
        true_flag = task.flag
        user_flag = form.flag.data
        contestant_id = g.user.id
        if not tournament.for_team_allowed and g.user.teams:
            contestant_id = g.user.teams[0]
        tournament_to_object = TournamentsToObject.get_one_or_none(tournament_id, contestant_id)
        if not tournament_to_object:
            return return_bad_status("Ты должен войти в турнир чтобы сдать таск")
        if Attempt.already_solved(tournament_to_object.id, task_id):
                return return_bad_status("Задача сдана")
        if user_flag == true_flag:
            attemp = Attempt(user_flag, True, task=task.id, tournament_to_object=tournament_to_object.id)
            attemp.save()
            send_scoreboard_to_room(tournament_id) # Notify everyone who is watching scoreboard for this tournament
            return return_ok_status({'right': True, 'message' : 'Попытка добавлена'})
        else:
            attemp = Attempt(user_flag, False, task=task.id, tournament_to_object=tournament_to_object.id)
            attemp.save()
            return return_ok_status({'right': False, 'message' : 'Попытка добавлена'})


class GetTask(MethodView):
    def get(self, task_id):
        task = Task.get_by_id(task_id)
        if task:
            return return_ok_status(TaskSchema().dump(task).data)
        return return_ok_status('bad')


class GetTasksByTournament(MethodView):
    def get(self, tournament_id):
        tasks = Task.get_all_tasks_by_tournament_id(tournament_id)
        if tasks:
            return return_ok_status(TaskSchema(many=True).dump(tasks).data)
        return return_bad_status('bad')


class EditTask(FormIDController):
    def get_form(self) -> FlaskForm:
        return TaskForm()

    def process(self, form, id):
        task = Task.get_by_id(id)
        if task:
            Task.update_by_id(id, 'name', form.name.data)
            Task.update_by_id(id, 'info', form.info.data)
            Task.update_by_id(id, 'score', int(form.score.data))
            Task.update_by_id(id, 'type', form.type.data)
            Task.update_by_id(id, 'flag', form.flag.data)
            return return_ok_status('ok')
        return return_ok_status('bad')
