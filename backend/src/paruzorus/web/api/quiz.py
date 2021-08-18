from aiohttp import web
from aiohttp_session import get_session

from paruzorus.controllers.quiz_controller import QuizController

routes = web.RouteTableDef()
BASE = "/quiz"


@routes.post(BASE + "/reset_score")
async def reset_score(request: web.Request):
    session = await get_session(request)
    session["score"] = 0
    session["total"] = 0
    return web.Response(status=200)


@routes.get(BASE + "/current_score")
async def current_score(request: web.Request):
    session = await get_session(request)
    return web.json_response(
        {
            "current_score": session.get("score", 0),
            "question_answered": session.get("question_answered", 0),
        }
    )


@routes.get(BASE + "/new_question")
async def new_question(request: web.Request):
    session = await get_session(request)
    controller: QuizController = request.config_dict["quiz_controller"]
    question = await controller.get_question()
    session["current_answer"] = question.answer
    return web.json_response({"picture_url": question.picture_url})


@routes.post(BASE + "/validate_answer")
async def validate_answer(request: web.Request):
    session = await get_session(request)

    if not session.get("current_answer"):
        raise web.HTTPBadRequest(reason="You need to generate a question first")

    controller: QuizController = request.config_dict["quiz_controller"]
    data = await request.json()

    if "answer" not in data:
        raise web.HTTPBadRequest(reason="No answer provided")

    if "score" not in session:
        session["score"] = 0
        session["question_answered"] = 0

    current_answer = session["current_answer"]
    session["current_answer"] = None
    success = controller.validate_answer(data["answer"], current_answer)
    session["score"] += 1 if success else -1
    session["score"] = max(session["score"], 0)
    session["question_answered"] += 1

    return web.json_response(
        {
            "success": success,
            "correct_answer": current_answer,
            "current_score": session["score"],
            "question_answered": session["question_answered"],
        }
    )
