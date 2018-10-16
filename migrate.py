from app.server import db
from app.server.api.models.Tournament import Tournament
from app.server.api.models.TournametsToObjects import TournamentsToObject
from app.server.api.models.user import User
from app.server.api.models.contestant import Contestant
from app.server.api.models.team import Team
from app.server.api.models import *


db.drop_all()
db.create_all()

db.session.commit()