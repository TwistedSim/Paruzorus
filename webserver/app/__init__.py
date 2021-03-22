import os

from flask import Flask
from flask import Blueprint

from flask_socketio import SocketIO

from flask_cors import CORS


app = Flask(__name__, 
    static_folder = os.environ.get('STATIC_FOLDER', '/var/paruzorus/www/'),
)

socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")
