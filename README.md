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
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

To integrate a real chat API, modify `src/pages/ChatPage.tsx`:

```typescript
// Replace simulation with real API call
const response = await api.post('/chat', {
  message: userMessage.content,
  conversation_id: activeConversation.id
});

const aiMessage: Message = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content: response.data.message,
  timestamp: new Date(),
};
```

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
