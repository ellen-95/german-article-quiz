import json
import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "words.db"
QUESTIONS_PATH = BASE_DIR / "data" / "questions.json"


def seed_words():
    with QUESTIONS_PATH.open(encoding="utf-8") as file:
        questions = json.load(file)["questions"]

    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM words")
    cursor.executemany(
        """
        INSERT INTO words (id, word, article, level)
        VALUES (:id, :word, :article, :level)
        """,
        questions,
    )

    connection.commit()
    connection.close()


if __name__ == "__main__":
    seed_words()
    print("Seeded words table with quiz data.")
