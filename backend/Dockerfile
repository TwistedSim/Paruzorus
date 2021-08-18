FROM python:3.8-slim

RUN apt-get update && apt-get -y install gcc
RUN python -m pip install -U pdm
RUN pip install aiohttp_devtools
WORKDIR /app

COPY pyproject.toml pyproject.toml
COPY pdm.lock pdm.lock
RUN pdm sync

COPY . /app
RUN pdm install

CMD ["pdm", "run", "start_server"]
