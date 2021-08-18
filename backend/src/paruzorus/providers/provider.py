from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Sequence


@dataclass
class Question:
    picture_url: str
    answer: str


class Provider(ABC):
    def __init__(self, species: Sequence[str], language: str = "fr") -> None:
        self.species = species
        self.language = language

    @abstractmethod
    async def generate_question(self) -> Question:
        ...
