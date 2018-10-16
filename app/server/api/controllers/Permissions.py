from flask.views import View
from flask import abort


class PermissionMixin(View):
    def dispatch_request(self, *args, **kwargs):
        if self.check_permissions(*args, **kwargs):
            return super().dispatch_request(*args, **kwargs)
        else:
            abort(401)

    def check_permissions(self, *args, **kwargs):
        return True
