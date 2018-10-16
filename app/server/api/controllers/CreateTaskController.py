# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from app.server.helpers.auth import login_required
from .FormController import FormController
from app.server.helpers import *

from app.server.api.forms.TaskForm import TaskForm
from app.server.api.models.task import Task

from app.server.helpers import return_ok_status

class CreateTaskController(FormController):
    decorators = [login_required]

    def get_form(self) -> FlaskForm:
        return TaskForm()

    def process(self, form: FlaskForm):
        if not is_auth():
            return return_bad_status("Вы не авторизованы!")

        user_id = session['id']
        task = Task(form.name.data, form.info.data, form.score.data,
                    form.type.data, form.flag.data, form.tournament.data)
        task.creator_id = user_id
        task.save()
        return return_ok_status('Задача успешно создана')





