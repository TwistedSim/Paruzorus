FROM python:3.8

RUN pip install pipenv

WORKDIR /app

COPY Pipfile* /app/
RUN pipenv install --deploy
ADD . ./

CMD ["pipenv", "run", "start"]
