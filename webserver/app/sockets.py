import requests
import unidecode
import random
import Levenshtein

from flask_socketio import Namespace
from flask_socketio import emit
from flask_socketio import disconnect

from flask import session
from flask import request

from app import socketio

TARGET_SPECIES = [
    'bawwar',
    'tenwar',
    'orcwar',
    'naswar',
    'conwar',
    'mouwar',
    'comyel',
    'amered',
    'camwar',
    'norpar',
    'magwar',
    'bkbwar',
    'babwar',
    'yelwar',
    'chswar',
    'bkpwar',
    'palwar',
    'btbwar',
    'yetwar',
    'pinwar',
    'yerwar',
    'buwwar',
    'canwar',
    'btnwar',
    'wlswar',
    'gowwar',
    'cerwar',
    'norwat',

]


def find_new_picture():
    specie_code = random.choice(TARGET_SPECIES)
    r = requests.get('https://search.macaulaylibrary.org/catalog.json', params = {
            'taxonCode': specie_code,
            'mediaType': 'p',
            'qua': [4, 5],
            'count': 50,
        }, cookies={'locale': 'fr'})
    response = r.json()
    answer = response['searchRequestForm']['q']
    picture_url = random.choice(response['results']['content'])['previewUrl']
    return answer, picture_url


class MyNamespace(Namespace):

    def send_new_question(self):
        answer, picture_url = find_new_picture()
        last_answer, session['answer'] = session.get('answer'), answer
        emit('newPicture', {
            'question': picture_url,
            'score': session['score'],
            'lastAnswer': last_answer,
        })

    def on_connect(self):
        session['score'] = 0
        self.send_new_question()

    def on_disconnect(self):
        print('Client disconnected', request.sid)

    def on_my_ping(self):
        emit('my_pong')

    def on_playerAnswer(self, guess):
        guess = unidecode.unidecode(guess).lower()
        answer = unidecode.unidecode(session['answer']).lower()
        if Levenshtein.distance(guess, answer) <= 3:
            session['score'] += 1
        else:
            session['score'] -= 3
            session['score'] = max(session['score'], 0)              
        self.send_new_question()

socketio.on_namespace(MyNamespace('/'))

