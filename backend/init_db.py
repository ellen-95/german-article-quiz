import sqlite3
from pathlib import Path


DB_PATH = Path(__file__).with_name("words.db")


def init_db():
    connection = sqlite3.connect(DB_PATH)
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


if __name__ == "__main__":
    init_db()
    print(f"Database initialized at {DB_PATH}")
