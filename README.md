# 🤖 Chatbot AI - React TypeScript

A modern chatbot application with JWT authentication, built with React, TypeScript, and Vite. User interface inspired by ChatGPT.

## ✨ Features

- 🔐 **Complete Authentication** - Login and registration with JWT
- 💬 **Modern Chat Interface** - ChatGPT-inspired design
- 🔒 **Protected Routes** - Conditional access based on JWT token
- 📱 **Responsive** - Optimized for desktop and mobile
- 🎨 **Polished UI/UX** - Smooth animations and dark mode design
- 💾 **Conversation Management** - Sidebar with chat history
- ⚡ **Performance** - Optimized build with Vite

## 🚀 Quick Start

### Prerequisites

- Node.js 20.9+ or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd agent_tool_react

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### .env File

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# JWT Configuration
VITE_JWT_TOKEN_KEY=chatbot_jwt_token

# Chatbot Configuration
VITE_BOT_INDEX_NAME=test1
```

### Backend API

The application expects the following API endpoints:

#### Registration
```http
POST /api/signup
Content-Type: application/json

{
  "user_name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
"string"
```

**Error (422):**
```json
{
  "detail": [
    {
      "loc": ["string"],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "message": "Login Successful",
  "data": {
    "user_id": "062c770c-bbea-4d25-9674-1fd62389674e",
    "email": "user@example.com",
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_id": "062c770c-bbea-4d25-9674-1fd62389674e",
    "user_name": "username"
  },
  "message": "Login Successful",
  "succeeded": true
}
```

**Error (422):**
```json
{
  "detail": [
    {
      "loc": ["string"],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
```

#### Chat with Bot
```http
POST /api/chatbot-agent
Content-Type: application/json
Authorization: Bearer {token}

{
  "query": "Tell me about something",
  "bot_id": "23232",
  "index_name": "test1"
}
```

**Response (200):**
```json
{
  "succeeded": true,
  "response": "This is the bot response to your query...",
  "bot_id": "23232"
}
```

## 📁 Project Structure

```
agent_tool_react/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx    # Protected route component
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── pages/
│   │   ├── LoginPage.tsx         # Login page
│   │   ├── RegisterPage.tsx      # Registration page
│   │   ├── ChatPage.tsx          # Chatbot interface
│   │   ├── AuthPages.css         # Auth styles
│   │   └── ChatPage.css          # Chat styles
│   ├── services/
│   │   ├── api.ts                # Axios configuration
│   │   └── authService.ts        # Authentication services
│   ├── types/
│   │   ├── auth.ts               # Auth TypeScript types
│   │   └── chat.ts               # Chat TypeScript types
│   ├── App.tsx                   # Main component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables (don't commit)
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔐 Authentication

### Authentication Flow

1. User accesses login/registration page
2. After login, JWT is saved in `localStorage`
3. Every API request automatically includes the token in `Authorization` header
4. Protected routes verify token validity
5. If token is expired or invalid, user is redirected to login

### Token Management

The JWT token is:
- Saved in `localStorage` after login
- Automatically added to API requests via Axios interceptor
- Verified on every protected route access
- Removed on logout or if expired

## 🎨 Customization

### Colors

Main colors are defined in CSS files:

```css
/* Main colors */
--primary: #6366f1;
--background: #1a1a2e;
--surface: #16213e;
--text: #ffffff;
```

### Chat API Integration

The chat is now integrated with the real API. The application:

1. Sends user messages to `POST /api/chatbot-agent` with Bearer token
2. Uses `index_name` from environment variable (default: "test1")
3. Generates a random `bot_id` for each conversation
4. Displays the bot's response in the chat interface

The chat service automatically includes the JWT token in the Authorization header.

## 📦 Main Dependencies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **React Router DOM 7** - Routing
- **Axios** - HTTP client

## 🚢 Deployment

### Production Build

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Production Environment Variables

Make sure to configure environment variables in your hosting provider:

- `VITE_API_BASE_URL` - Your backend API URL
- `VITE_JWT_TOKEN_KEY` - Key to save JWT
- `VITE_BOT_INDEX_NAME` - Bot index name (default: test1)

## 🐛 Troubleshooting

### Error: "crypto.hash is not a function"

Update Node.js to version 20.19+ or higher.

### CORS Error

Configure your backend to accept requests from the frontend:

```python
# FastAPI example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Invalid Token

Verify that the JWT is in the correct format and not expired. The token must be a valid JWT with an `exp` (expiration) field.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

---

Built with ❤️ using React + TypeScript + Vite
