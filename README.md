# Notes Manager (Full Stack, Google OAuth)

## Video Demo: https://youtu.be/vivd7iMPAuc

## Prerequisites
- Node.js >= 18
- npm >= 9.x
- MongoDB Atlas URI or local Mongo server
- Google OAuth credentials (Client ID & Secret)

## Setup

### 1. Clone the repository

```
git clone https://github.com/anant-c/notes-manager.git
cd backend
```


### 2. Setup Backend `.env`
Create a `.env` file in `/backend` folder with:
```
PORT=<your_port>
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret>
JWT_EXPIRY=<e.g., 1d>
GOOGLE_CLIENT_ID=<OAuth client id>
GOOGLE_CLIENT_SECRET=<OAuth client secret>
```

### 3. Start Backend
```
npm install
npm run dev
```

### 4. Setup Frontend `.env`
Create a `.env` file in `/frontend` folder with:
```
VITE_GOOGLE_CLIENT_ID=<OAuth client id>
VITE_GOOGLE_CLIENT_SECRET=<OAuth cliend secret>
VITE_SERVER_URL=<backend server url>
```

### 5. Start Frontend
```
npm install
npm run dev
```

## Google OAuth Setup

1. Go to https://console.developers.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Set Authorized JavaScript origins and redirect URIs (e.g., `http://localhost:5173`, `http://localhost:8000`)
4. Copy your client ID and secret and paste in `.env` files.

---