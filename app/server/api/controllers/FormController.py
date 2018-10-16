# -*- coding: utf-8 -*-

from flask.views import MethodView
from flask_wtf import FlaskForm
from app.server.helpers import *


class FormController(MethodView):
    def post(self):
        form = self.get_form()
        if form.validate():
            return self.process(form)
        print(list(form.errors.values()))
        return return_bad_status(list(form.errors.values())[0][0])

    def get_form(self) -> FlaskForm:
        raise NotImplementedError("please specify the form")

    def process(self, form: FlaskForm):
        raise NotImplementedError("Please specify the action")


class FormIDController(MethodView):
    def post(self, id):
        form = self.get_form()

        if form.validate():
            return self.process(form, id)

        return return_bad_status(list(form.errors.values())[0][0])

    def get_form(self) -> FlaskForm:
        raise NotImplementedError('please save me')

    def process(self,form,id):
        raise NotImplementedError("please specify the form")

    def get_data(self, id):
        raise NotImplementedError()
