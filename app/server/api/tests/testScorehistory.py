import unittest
from datetime import datetime
from app.server.api.models.scorehistory import ScoreHistory
from app.server.api.models.user import User
from app.server.api.models.team import Team
import os
from app.server import app, db
import random
import string
import datetime

from app.server.api.tests.base import BaseTestCase

TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class TestScorehistory(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.app = app.test_client()
        u = User('John Novikov', 'fuck.rkn@fuck.rkn', 'login', 'secretpass', 123)
        u.save()
        u2 = User('Johnnnn Novikov', 'fuck.rkn@fuck.rkn', 'login', 'secretpass', 123)
        u.save()
        db.session.add(Team('Shadow Servants'))
        db.session.add(Team('Shadow Servants'))
        db.session.commit()
        self.sh1 = ScoreHistory(500, datetime.datetime(2018, 1, 1, 00, 00, 00), contestant=1, tournament=1)
        self.sh2 = ScoreHistory(700, datetime.datetime(2018, 1, 1, 00, 00, 00), contestant=1, tournament=1)
        self.sh3 = ScoreHistory(700, datetime.datetime(2018, 1, 1, 00, 00, 00), contestant=2, tournament=1)
        self.sh4 = ScoreHistory(900, datetime.datetime(2018, 1, 1, 00, 00, 00), contestant=2, tournament=1)


    def test_should_model_has_need_fields(self):
        self.assertTrue(hasattr(self.sh1, "id"))
        self.assertTrue(hasattr(self.sh1, "contestant"))
        self.assertTrue(hasattr(self.sh1, "time"))
        self.assertTrue(hasattr(self.sh1, "score"))
        self.assertTrue(hasattr(self.sh1, "tournament"))

    def test_should_add_into_db(self):
        self.sh2.save()
        self.assertIn(self.sh2, db.session.query(ScoreHistory).all())

    def test_should_return_last_score(self):
        self.sh1.save()
        self.sh2.save()
        self.sh3.save()
        self.sh4.save()
        res = ScoreHistory.get_scoreboard(1)
        res = [r[1] for r in res]
        self.assertIn(self.sh2, res)
        self.assertNotIn(self.sh1, res)

    def test_should_return_no_team_dublicates(self):
        self.sh1.save()
        self.sh2.save()
        self.sh3.save()
        self.sh4.save()
        res = ScoreHistory.get_scoreboard(1)
        self.assertEquals(len(res), 2)
