# German Article Quiz

German Article Quiz is a full-stack web application designed to help learners master German noun articles (`der`, `die`, `das`) through interactive, level-based quizzes.

## Key Highlights

- Full-stack architecture with React frontend and Flask backend
- REST API serving quiz data from a SQLite database
- Deployed on Vercel (frontend) and Render (backend)
- Client-side persistence using `localStorage` for mistakes and high scores
- Randomized question order for improved learning

## Live Demo

- App: `https://german-article-quiz.vercel.app/`
- API: `https://german-article-quiz.onrender.com/api/words?level=A1`

## Features

- Practice mode with immediate feedback
- Test mode for score-based practice
- Native Challenge (Deutsch-Meister)
- CEFR level selection from A1 to C2
- Timer in timed quiz modes
- Wrong answer tracking and review
- Persistent mistake tracking with `localStorage`
- Best score tracking per level with date
- Loading and error states during API requests

## Tech Stack

- Frontend: React
- Backend: Flask (Python, REST API)
- Database: SQLite
- Deployment: Vercel and Render

The stack is intentionally lightweight to keep the project easy to understand, run locally, and deploy.

## Project Structure

```text
german-article-quiz/
├── backend/
│   ├── app.py
│   ├── data/
│   │   └── questions.json
│   ├── init_db.py
│   ├── requirements.txt
│   ├── seed_words.py
│   └── words.db
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── public/
│   └── src/
└── README.md
```

- `frontend/` contains the React user interface and browser-side state such as mistake review and best score tracking.
- `backend/` contains the Flask API, SQLite database, and setup scripts for initializing and seeding quiz data.

## Architecture

User → React frontend → Fetch API → Flask backend → SQLite database → JSON response → React UI

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python init_db.py
python seed_words.py
python app.py
```

The backend runs locally at `http://127.0.0.1:5000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs locally at `http://localhost:3000`.

### Environment Variable

Create `frontend/.env` and set:

```env
REACT_APP_API_URL=http://127.0.0.1:5000
```

For production, set `REACT_APP_API_URL` to your deployed Render backend URL.

## API Endpoints

### `GET /api/words?level=A1`

Returns quiz words for the requested level.

Example:

```http
GET /api/words?level=A1
```

Example response:

```json
[
  {
    "id": 1,
    "word": "Tisch",
    "article": "der",
    "level": "A1"
  }
]
```

## Design Decisions

### Why SQLite

SQLite keeps the project simple and beginner-friendly. It works well for a small, read-heavy learning application and requires no separate database server during local development.

### Why `localStorage`

The app uses `localStorage` for mistake tracking and best score tracking because the project does not require user accounts yet. This allows progress to persist in the browser without adding authentication or a user database.

### Why Separate Frontend and Backend

The frontend and backend are separated to keep responsibilities clear. React handles the user experience and quiz interactions, while Flask provides quiz data through a simple API.

### How Mistakes and Scores Are Persisted

- Mistakes are stored in `localStorage` under `germanQuizMistakes`
- Best scores are stored in `localStorage` under `germanQuizBestScores`
- Best scores are grouped by mode and level, such as `test-A1` or `native-Native`
- The SQLite database stores the quiz word dataset used by the backend API

## Future Improvements

- Migrate from SQLite to PostgreSQL for more production-ready data management
- Add user authentication and cloud-synced progress
- Expand the quiz dataset with more nouns, examples, and learning metadata

---

This project was built as part of my Applied AI studies to practice full-stack development and real-world deployment.
