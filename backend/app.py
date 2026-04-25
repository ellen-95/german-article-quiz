import json
import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
DB_PATH = Path(__file__).with_name("words.db")
QUESTIONS_PATH = Path(__file__).with_name("data") / "questions.json"


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY,
            word TEXT,
            article TEXT,
            level TEXT
        )
        """
    )

    connection.commit()
    connection.close()


def seed_words_if_needed():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) AS count FROM words")
    row = cursor.fetchone()
    word_count = row["count"]

    if word_count == 0:
        with QUESTIONS_PATH.open(encoding="utf-8") as file:
            questions = json.load(file)["questions"]

        cursor.executemany(
            """
            INSERT INTO words (id, word, article, level)
            VALUES (:id, :word, :article, :level)
            """,
            questions,
        )
        connection.commit()

    connection.close()


init_db()
seed_words_if_needed()


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/words")
def get_words():
    level = request.args.get("level")

    if not level:
        return jsonify({"error": "Missing level query parameter"}), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id, word, article, level FROM words WHERE level = ?",
        (level,),
    )
    rows = cursor.fetchall()
    connection.close()

    words = [dict(row) for row in rows]
    return jsonify(words)


if __name__ == "__main__":
    app.run(debug=True)
