import unittest
from datetime import datetime

from flask import json

from app.server.api.tests.base import BaseTestCase
from app.server.api.models.user import User
from app.server.api.models.team import Team
import os
from app.server import app, db

TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class TestTeam(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.app = app.test_client()

        self.user = User('name', 'test@test', 'login', 'pass', 'code')
        self.user.save()
        with self.app.session_transaction() as session:
            session['id'] = self.user.id

        self.team = Team("Bushwhackers", 'Moscow', 'qwerty', self.user)

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_should_model_has_need_fields(self):
        self.assertTrue(hasattr(self.team, "id"))
        self.assertTrue(hasattr(self.team, "name"))
        self.assertTrue(hasattr(self.team, 'city'))
        self.assertTrue(hasattr(self.team, 'invite_code'))
        self.assertTrue(hasattr(self.team, 'creator'))
        self.assertTrue(hasattr(self.team, 'creator_id'))

    def test_should_team_delete(self):
        self.team.save()
        with app.app_context():
            self.team.delete()
            self.assertFalse(Team.query.count())

    def test_team_can_be_created(self):
        response = self.app.post('/api/team/create', data={
            'name': self.team.name,
            'city': self.team.city,
            'invite_code': self.team.invite_code
        })
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')

    def test_all_team_can_be_got(self):
        team_for_quantity = Team('SS', 'Moscow', 'lolkek', self.user)
        team_for_quantity.save()

        response = self.app.get('/api/teams')
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertEqual(len(response['result']), 2)

    def test_one_team_can_be_got_by_id(self):
        self.team.save()

        response = self.app.get('/api/teams/{}'.format(self.team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertEqual(response['result'][0]['id'], self.team.id)

    def test_team_members_can_be_got(self):
        self.team.save()

        response = self.app.get('/api/teams/{}/members'.format(self.team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertEqual(response['result'][0][0]['id'], self.user.id)

    def test_user_can_join_the_team_by_right_code(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.get('/team/join?code={}'.format(test_team.invite_code))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertTrue(self.user in test_team.members)

    def test_user_cant_join_the_team_by_wrong_code(self):
        response = self.app.get('/team/join?code=keklol')
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Неверный код приглашения')

    def test_user_cant_join_the_team_twice(self):
        response = self.app.get('/team/join?code={}'.format(self.team.invite_code))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы уже присоединены к команде')

    def test_user_can_leave_the_team(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()
        test_team.add_new_member(self.user)

        response = self.app.get('/api/teams/{}/leave'.format(test_team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertFalse(self.user in test_team.members)

    def test_user_cant_leave_a_nonexistent_team(self):
        response = self.app.get('/api/teams/666/leave')
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Команды с таким id не существует')

    def test_user_cant_leave_the_team_if_he_is_not_in_it(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.get('/api/teams/{}/leave'.format(test_team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы уже/еще не в команде')

    def test_invite_code_can_be_changed_by_creator(self):
        self.team.save()

        response = self.app.get('/api/teams/{}/code/change'.format(self.team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')

    def test_invite_code_cant_be_changed_not_by_creator(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.get('/api/teams/{}/code/change'.format(test_team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы не имеете доступа к ссылке приглашения в команду')

    def test_invite_code_cant_be_updated_in_nonexistent_team(self):
        response = self.app.get('/api/teams/666/code/change')
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Команды с таким id не существует')

    def test_invite_code_can_be_got_by_creator(self):
        self.team.save()

        response = self.app.get('/api/teams/{}/code'.format(self.team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')

    def test_invite_code_cant_be_got_not_by_creator(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.get('/api/teams/{}/code'.format(test_team.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы не имеете доступа к ссылке приглашения в команду')

    def test_invite_code_cant_be_got_in_nonexistent_team(self):
        response = self.app.get('/api/teams/666/code')
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Команды с таким id не существует')

    def test_team_name_can_be_changed_by_creator(self):
        self.team.save()

        response = self.app.post('/api/teams/{}/name/change'.format(self.team.id), data={'name': 'SS'})
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertEqual(Team.get_by_id(self.team.id).name, 'SS')

    def test_team_city_can_be_changed_by_creator(self):
        self.team.save()

        response = self.app.post('/api/teams/{}/city/change'.format(self.team.id), data={'city': 'Hum'})
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertEqual(Team.get_by_id(self.team.id).city, 'Hum')

    def test_team_name_cant_be_changed_not_by_creator(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.post('/api/teams/{}/name/change'.format(test_team.id), data={'name': 'kek'})
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы не имеете прав редактировать команду')

    def test_team_city_cant_be_changed_not_by_creator(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.post('/api/teams/{}/city/change'.format(test_team.id), data={'city': 'kek'})
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы не имеете прав редактировать команду')

    def test_member_can_be_deleted_from_team_by_creator(self):
        self.team.save()
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_user.save()
        self.team.add_new_member(test_user)

        response = self.app.get('/api/teams/{}/delete/{}'.format(self.team.id, test_user.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'ok')
        self.assertFalse(self.team.if_user_in_the_team(test_user))

    def test_member_cant_be_deleted_from_team_not_by_creator(self):
        test_user = User('test', 'test@test', 'test', 'pass', 'lol')
        test_user.save()
        test_team = Team('SS', 'Moscow', 'lolkek', test_user)
        test_team.save()

        response = self.app.get('/api/teams/{}/delete/{}'.format(test_team.id, test_user.id))
        self.assertEqual(response.status_code, 200)

        response = json.loads(response.data)
        self.assertEqual(response['status'], 'bad')
        self.assertEqual(response['result'], 'Вы не имеете прав редактировать команду')
