import flask_testing
from flask import _request_ctx_stack

from app.server import get_app, db, app


class BaseTestCase(flask_testing.TestCase):
    TEST_CONFIG = dict(
        PRESERVE_CONTEXT_ON_EXCEPTION=False,
        SECRET_KEY='testing-session-key',
        SQLALCHEMY_DATABASE_URI="sqlite://",
        TESTING=True,
        DEBUG=False,
    )

    def create_app(self):
        return app

    def setUp(self):
        super(BaseTestCase, self).setUp()
        app.config.update(self.TEST_CONFIG)
        db.init_app(app)
        db.create_all()
        app.config['CSRF_ENABLED'] = False

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        super(BaseTestCase, self).tearDown()
