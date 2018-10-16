from flask import session, jsonify
from flask.views import MethodView
from app.server.api.controllers.Permissions import PermissionMixin
from app.server.helpers import return_ok_status


class KekController(PermissionMixin, MethodView):

    def check_permissions(self,id):
        return int(id) % 2 == 0

    def get(self, id):
        return return_ok_status(id)
