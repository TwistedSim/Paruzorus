from typing import Optional

from flask import Blueprint
from flask import request
from flask import make_response

from dataclasses import dataclass
from dataclasses import replace

from dataclasses_json import dataclass_json

@dataclass_json
@dataclass
class Task:    
    text: str
    day: str
    reminder: bool
    id: Optional[int] = None


api_bp = Blueprint('api_bp', __name__)

tasks = {}
current_task_id = 0

@api_bp.route('/tasks',  methods=['GET'])
def get_all_tasks():
    return Task.schema().dumps(tasks.values(), many=True)

@api_bp.route('/tasks/<int:id_>', methods=['GET'])
def get_tasks(id_):
    if id_ in tasks:
        return tasks[id_].to_dict()
    return make_response({}, 404)

@api_bp.route('/tasks', methods=['POST'])
def create_task():
    global current_task_id
    task = Task(**request.json)
    current_task_id += 1
    task.id = current_task_id
    tasks[task.id] = task
    return task.to_dict()

@api_bp.route('/tasks/<int:id_>', methods=['DELETE'])
def delete_task(id_):
    if id_ not in tasks:
        return make_response({}, 404)
    del tasks[id_]
    return make_response("", 200)


@api_bp.route('/tasks/<int:id_>', methods=['PUT'])
def update_task(id_):
    if id_ not in tasks:
        return make_response({}, 404)
    tasks[id_] = replace(tasks[id_], **request.json)
    return tasks[id_].to_dict()
    
      
      
