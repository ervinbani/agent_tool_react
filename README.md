# 🤖 Chatbot AI - React TypeScript

Un'applicazione chatbot moderna con autenticazione JWT, costruita con React, TypeScript e Vite. Interfaccia utente ispirata a ChatGPT.

## ✨ Caratteristiche

- 🔐 **Autenticazione completa** - Login e registrazione con JWT
- 💬 **Interfaccia chat moderna** - Design ispirato a ChatGPT
- 🔒 **Route protette** - Accesso condizionato basato su token JWT
- 📱 **Responsive** - Ottimizzato per desktop e mobile
- 🎨 **UI/UX curata** - Animazioni fluide e design dark mode
- 💾 **Gestione conversazioni** - Sidebar con storico chat
- ⚡ **Performance** - Build ottimizzata con Vite

## 🚀 Quick Start

### Prerequisiti

- Node.js 20.9+ o superiore
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone <repository-url>
cd agent_tool_react

# Installa le dipendenze
npm install

# Configura le variabili d'ambiente
cp .env.example .env
# Modifica .env con i tuoi valori

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## 🔧 Configurazione

### File .env

Crea un file `.env` nella root del progetto:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# JWT Configuration
VITE_JWT_TOKEN_KEY=chatbot_jwt_token
```

### API Backend

L'applicazione si aspetta le seguenti API:

#### Registrazione
```http
POST /api/signup
Content-Type: application/json

{
  "user_name": "string",
  "email": "string",
  "password": "string"
}
```

**Risposta (200):**
```json
"string"
```

**Errore (422):**
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

**Risposta (200):**
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Errore (422):**
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

## 📁 Struttura del Progetto

```
agent_tool_react/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx    # Componente per route protette
│   ├── contexts/
│   │   └── AuthContext.tsx       # Context per autenticazione
│   ├── pages/
│   │   ├── LoginPage.tsx         # Pagina di login
│   │   ├── RegisterPage.tsx      # Pagina di registrazione
│   │   ├── ChatPage.tsx          # Interfaccia chatbot
│   │   ├── AuthPages.css         # Stili auth
│   │   └── ChatPage.css          # Stili chat
│   ├── services/
│   │   ├── api.ts                # Configurazione Axios
│   │   └── authService.ts        # Servizi autenticazione
│   ├── types/
│   │   ├── auth.ts               # Tipi TypeScript auth
│   │   └── chat.ts               # Tipi TypeScript chat
│   ├── App.tsx                   # Componente principale
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Stili globali
├── .env                          # Variabili d'ambiente (non committare)
├── .env.example                  # Template variabili d'ambiente
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Scripts Disponibili

```bash
# Sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview

# Lint del codice
npm run lint
```

## 🔐 Autenticazione

### Flusso di Autenticazione

1. L'utente accede alla pagina di login/registrazione
2. Dopo il login, il JWT viene salvato in `localStorage`
3. Ogni richiesta API include automaticamente il token nell'header `Authorization`
4. Le route protette verificano la validità del token
5. Se il token è scaduto o invalido, l'utente viene reindirizzato al login

### Gestione Token

Il token JWT viene:
- Salvato in `localStorage` dopo il login
- Aggiunto automaticamente alle richieste API tramite interceptor Axios
- Verificato ad ogni accesso a route protette
- Rimosso al logout o se scaduto

## 🎨 Personalizzazione

### Colori

I colori principali sono definiti nei file CSS:

```css
/* Colori principali */
--primary: #6366f1;
--background: #1a1a2e;
--surface: #16213e;
--text: #ffffff;
```

### Integrazione API Chat

Per integrare una vera API di chat, modifica `src/pages/ChatPage.tsx`:

```typescript
// Sostituisci la simulazione con una chiamata API reale
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

## 📦 Dipendenze Principali

- **React 19** - Libreria UI
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **React Router DOM 7** - Routing
- **Axios** - HTTP client

## 🚢 Deploy

### Build per Produzione

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

### Deploy su Vercel

```bash
npm install -g vercel
vercel
```

### Deploy su Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Variabili d'Ambiente in Produzione

Assicurati di configurare le variabili d'ambiente nel tuo provider di hosting:

- `VITE_API_BASE_URL` - URL della tua API backend
- `VITE_JWT_TOKEN_KEY` - Chiave per salvare il JWT

## 🐛 Troubleshooting

### Errore: "crypto.hash is not a function"

Aggiorna Node.js alla versione 20.19+ o superiore.

### Errore CORS

Configura il tuo backend per accettare richieste dal frontend:

```python
# FastAPI esempio
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Token non valido

Verifica che il JWT sia nel formato corretto e non scaduto. Il token deve essere un JWT valido con campo `exp` (expiration).

## 📝 Licenza

MIT

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

---

Sviluppato con ❤️ usando React + TypeScript + Vite
