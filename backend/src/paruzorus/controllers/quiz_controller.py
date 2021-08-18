import Levenshtein

from paruzorus.providers.provider import Provider, Question


class QuizController:
    MAX_LEVENSHTEIN_DISTANCE = 3

    def __init__(self, provider: Provider):
        self.provider = provider

    async def get_question(self) -> Question:
        return await self.provider.generate_question()

    def validate_answer(self, answer: str, guess: str) -> bool:
        return Levenshtein.distance(guess.lower(), answer.lower()) <= self.MAX_LEVENSHTEIN_DISTANCE
