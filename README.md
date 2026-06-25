# RTCEditor

A real-time collaborative code editor built using React, Node.js, Socket.IO, and Judge0 API.

## Features

* Real-time collaborative coding
* Multi-user rooms
* Live code synchronization
* Live language synchronization
* Typing indicators
* Code compilation and execution
* Shared compilation results
* Multiple programming language support
* Room-based collaboration

## Tech Stack

### Frontend

* React
* Vite
* Socket.IO Client
* Monaco Editor

### Backend

* Node.js
* Express.js
* Socket.IO
* Axios

### Code Execution

* Judge0 API (RapidAPI)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/RTCEditor.git
cd RTCEditor
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
RAPID_API_KEY=your_rapidapi_key
RAPID_API_HOST=judge0-ce.p.rapidapi.com
PORT=5000
```

Start server:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

## Supported Languages

* JavaScript
* TypeScript
* Python
* Java
* C
* C++
* Go
* Rust
* PHP
* Ruby

and many more through Judge0.

---

## How It Works

1. Users join the same room using a Room ID.
2. Code changes are instantly synchronized using Socket.IO.
3. Language changes are synchronized across all participants.
4. Any participant can execute code.
5. Compilation results are shared with everyone inside the room.

---

## Future Improvements

* Authentication
* Persistent rooms
* Chat functionality
* Code saving
* Whiteboard support
* Video calling
* Docker-based self-hosted compiler
* Interview mode
* Execution history

---

## Screenshots

Add screenshots of your application here.

---

## License

MIT License

---

## Author

Sujal Ghorse

GitHub: https://github.com/9-Sujal
