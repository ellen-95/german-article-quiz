import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
DB_PATH = Path(__file__).with_name("words.db")


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/words")
def get_words():
    level = request.args.get("level")

    if not level:
        return jsonify({"error": "Missing level query parameter"}), 400

    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
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
