from pymongo import MongoClient
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionRetrieveAnswer(Action):
    def name(self) -> Text:
        return "action_retrieve_answer"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Connect to MongoDB
        client = MongoClient("mongodb://localhost:27017/")
        db = client["rasa_proj"]
        collection = db["user"]

        # Retrieve answer based on user question
        user_question = tracker.latest_message.get("text")
        result = collection.find_one({"question": user_question})

        # Send answer back to the user
        if result:
            answer = result["answer"]
        else:
            answer = "Sorry, I couldn't find an answer to your question."

        dispatcher.utter_message(text=answer)

        return []
