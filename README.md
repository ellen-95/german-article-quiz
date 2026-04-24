# German Article Quiz

This project is organized into two main folders:

- `backend/` for the Flask API, SQLite database, and seed scripts
- `frontend/` for the React app

## Project Structure

```text
german-article-quiz/
├── backend/
│   ├── app.py
│   ├── data/questions.json
│   ├── init_db.py
│   ├── requirements.txt
│   ├── seed_words.py
│   └── words.db
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── public/
│   └── src/
└── .gitignore
```

## Backend

From the repo root:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend runs locally at `http://127.0.0.1:5000`.

## Frontend

From the repo root:

```bash
cd frontend
npm install
npm start
```

The frontend uses `REACT_APP_API_URL` from `frontend/.env`.

## Seed Data

The quiz seed data now lives in `backend/data/questions.json`.
The SQLite database used by the Flask app lives in `backend/words.db`.
