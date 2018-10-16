# -*- coding: utf-8 -*-
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_socketio import SocketIO


def get_app(config=None):
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/')
    app.config.from_object('config')
    if config is not None:
        app.config.update(**config)
    return app

# app = Flask(__name__, static_folder='../static/dist', template_folder='../static/')
# app.config.from_object('config')
app = get_app()
db = SQLAlchemy(app)
admin = Admin(app)
socketio = SocketIO()
socketio.init_app(app, logger=True, engineio_logger=True)

mail = Mail(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
supports_credentials = True
ma = Marshmallow(app)

from .api.routes import api as api_blueprint
from .main.routes import main as main_blueprint

app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(main_blueprint)
