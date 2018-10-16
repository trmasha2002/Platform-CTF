import unittest
from datetime import datetime
from app.server.api.models.Tournament import Tournament
from app.server.api.models.TournametsToObjects import TournamentsToObject
from app.server.api.models.user import User
import os
from app.server import app, db
import random
import string

TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class TestTournament(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, TEST_DB)
        self.app = app.test_client()
        db.create_all()
        self.invite_link = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(32))

        our_time = "2019-01-05 22:14:39"
        our_time_to_live = "2019-04-05 22:14:39"

        our_datetime = datetime.strptime(our_time, "%Y-%m-%d %H:%M:%S")
        our_datetime_to_live = datetime.strptime(our_time_to_live, "%Y-%m-%d %H:%M:%S")

        self.user = User()
        self.user.add()

        print(self.user.id)

        self.tournament = Tournament("CTF", "description", self.user, our_datetime, our_datetime_to_live,
                                     "45.408062, -123.007827", self.invite_link, True, True, False, True)
        self.tournament.add()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_should_model_has_need_fields(self):
        self.assertTrue(hasattr(self.tournament, "id"))
        self.assertTrue(hasattr(self.tournament, "name"))
        self.assertTrue(hasattr(self.tournament, "description"))
        self.assertTrue(hasattr(self.tournament, "private"))
        self.assertTrue(hasattr(self.tournament, "platform"))
        self.assertTrue(hasattr(self.tournament, "invite_link"))
        self.assertTrue(hasattr(self.tournament, "creator"))
        self.assertTrue(hasattr(self.tournament, "time"))
        self.assertTrue(hasattr(self.tournament, "time_to_live"))
        self.assertTrue(hasattr(self.tournament, "place"))
        self.assertTrue(hasattr(self.tournament, "online"))
        self.assertTrue(hasattr(self.tournament, "for_team_allowed"))

    def test_should_tournament_delete(self):
        with app.app_context():
            self.tournament.delete()
            self.assertFalse(Tournament.query.count())

    def test_should_add_team_to_tournament(self):
        with app.app_context():
            self.team_to_tournament = TournamentsToObject(1, 1, self.user, self.tournament)
            self.assertEqual(self.team_to_tournament.add(), 1)

    def test_should_delete_team_to_tournament(self):
        with app.app_context():
            self.team_to_tournament = TournamentsToObject(1, 1, self.user, self.tournament)
            self.team_to_tournament.add()
            self.team_to_tournament.delete()
            self.assertFalse(TournamentsToObject.query.count())
