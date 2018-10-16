# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, send_from_directory

from app.server.api.controllers.JoinAndLeaveTeamControllers import JoiningTheTeamController

main = Blueprint('main', __name__, template_folder='../../static', static_folder='../../static')


def index(path=''):
    return render_template("index.html")


main.add_url_rule('/team/join', view_func=JoiningTheTeamController.as_view('join_team'))
main.add_url_rule("/map", view_func=index)
# main.add_url_rule("/<path:path>", view_func=index)
