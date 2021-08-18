import random
import re

import aiohttp

from paruzorus.providers.provider import Provider, Question


class MacAulayProvider(Provider):
    URL = "https://search.macaulaylibrary.org/catalog.json"

    async def generate_question(self) -> Question:
        params = {
            "taxonCode": random.choice(self.species),
            "mediaType": "p",
            "qua": [4, 5],
            "count": 50,
        }
        cookies = {"locale": self.language}
        async with aiohttp.ClientSession() as session:
            async with session.get(self.URL, params=params, cookies=cookies) as resp:
                response = await resp.json()
                picture_info = random.choice(response["results"]["content"])
                answer = picture_info["subjectData"][0]["comName"]
                picture_url = picture_info["previewUrl"]
        
        answer = re.sub(r'\s\(.*\)', '', answer)
        
        return Question(
            picture_url=picture_url,
            answer=answer,
        )
