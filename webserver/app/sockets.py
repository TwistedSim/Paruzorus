import requests
import unidecode
import random
import Levenshtein

from engineio.payload import Payload
Payload.max_decode_packets = 50

from flask import session
from flask import request

from app import socketio
from app.namespaces.quiz import Quiz

socketio.on_namespace(Quiz('/quiz'))
