from functools import wraps
from flask import abort
from app.server.helpers import is_auth


def login_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        if not is_auth():
            abort(401)
        return f(*args, **kwargs)
    return decorator