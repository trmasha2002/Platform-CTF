from .FormController import FormController
from app.server.api.forms.ChangeTaskInfo import *
from app.server.api.models.task import Task
from app.server.helpers import *
from app.server import db


class ChangeNameController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeNameForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.name).filter(Task.id == id) != form.name.data:
            Task.update_by_id(id, 'name', form.name.data)
            return return_ok_status('Name change.')
        else:
            return return_bad_status("No changes")


class ChangeInfoController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeInfoForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.info).filter(Task.id == id) != form.info.data:
            Task.update_by_id(id, 'info', form.info.data)
            return return_ok_status('Info change.')
        else:
            return return_bad_status("No changes")

class ChangeScoreController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeScoreForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.score).filter(Task.id == id) != form.score.data:
            Task.update_by_id(id, 'info', form.info.data)
            return return_ok_status('Score change.')
        else:
            return return_bad_status("No changes")

class ChangeTypeController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeTypeForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.type).filter(Task.id == id) != form.type.data:
            Task.update_by_id(id, 'type', form.type.data)
            return return_ok_status('Type change.')
        else:
            return return_bad_status("No changes")

class ChangeFlagController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeFlagForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.flag).filter(Task.id == id) != form.flag.data:
            Task.update_by_id(id, 'flag', form.flag.data)
            return return_ok_status('Flag change.')
        else:
            return return_bad_status("No changes")

class ChangeResourseController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeResourseForm()

    def process(self, form: FlaskForm):
        id = form.task_id.data
        if db.session.query(Task.resourse).filter(Task.id == id) != form.resourse.data:
            Task.update_by_id(id, 'resourse', form.resourse.data)
            return return_ok_status('Resourse change.')
        else:
            return return_bad_status("No changes")
