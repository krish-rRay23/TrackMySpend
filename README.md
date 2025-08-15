# TrackMySpend — Personal Finance Manager

A comprehensive personal finance management application built with React, TypeScript, Node.js, and MongoDB.

🌐 **Live Demo**: [https://track-my-spend.netlify.app](https://track-my-spend.netlify.app)

## 🚀 Features

- **Transaction Management**: Track income and expenses with categories
- **Budget Planning**: Set and monitor monthly budgets with smart suggestions
- **Smart Insights**: AI-powered financial insights and recommendations
- **Calendar View**: Visualize financial activities over time
- **Reminders**: Set up bill reminders and recurring payments
- **Data Export**: Export your financial data in various formats
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: Bcrypt password hashing and JWT token management

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for dev/build
- Tailwind CSS for styling
- shadcn/ui components
- React Router
- date-fns for date utilities

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (demo secret in code — replace for production)

---

## ▶️ Quick Start

Run frontend and backend in separate terminals.
### Before you start (clone & GitHub)

1. Clone the repository
```bash
# HTTPS
git clone https://github.com/<your-username>/TrackMySpend.git
# or SSH
git clone git@github.com:<your-username>/TrackMySpend.git
cd TrackMySpend
```

2. If this is a new local repo and you want to push to GitHub
```bash
# create repo on GitHub, then:
git remote add origin https://github.com/<your-username>/TrackMySpend.git
git branch -M main
git push -u origin main
```

3. Create a feature branch for changes
```bash
git checkout -b feature/your-feature
```

4. Install dependencies (root = frontend)
```powershell
npm install
```
Then in a separate terminal install backend deps:
```powershell
cd backend
npm install
```

5. Create backend environment file
```text
# backend/.env
MONGO_URI="your-mongodb-connection-string"
PORT=5000
JWT_SECRET="replace-with-a-secure-secret"
```

6. Commit & push your changes
```bash
git add .
git commit -m "chore: project setup"
git push -u origin feature/your-feature
```

Notes:
- Open pull requests on GitHub from your feature branch to main.
- Use protected branches, CI, and secrets in GitHub repository settings before deploying.
- After cloning, follow the Quick Start steps below to run frontend and backend in separate terminals.

### 1) Frontend (Vite)

```powershell
cd C:\Users\krish\TrackMySpend
npm install
npm run dev
```

- Vite will print a local URL (typically http://localhost:5173). Open it in your browser.

### 2) Backend (Express API)

```powershell
cd C:\Users\krish\TrackMySpend\backend
npm install

# Create .env file (required)
# Copy from .env.example:
cp .env.example .env
# Then edit .env with your MongoDB URI and JWT secret

npm run dev   # uses nodemon
# or
npm start     # node server.js
```

- API runs at http://localhost:5000 by default.
- Routes are mounted under `/api`: `/api/transactions`, `/api/budgets`, `/api/reminders`, `/api/auth`, `/api/reset`.

### 3) Run Both Together (Recommended)

```powershell
# Install dependencies first (frontend)
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Copy backend environment file
cd backend && cp .env.example .env && cd ..
# Edit backend/.env with your settings

# Run both frontend and backend
npx concurrently "npm run dev" "cd backend && npm run dev"
```

This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:5000

---

## 📦 Scripts

Frontend (from repo root):
- `npm run dev` — start Vite dev server
- `npm run build` — type-check + Vite production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run eslint
- `npx concurrently "npm run dev" "cd backend && npm run dev"` — run both frontend and backend

Backend (from `backend/`):
- `npm run dev` — start API with nodemon (auto reload)
- `npm start` — start API with node
- `npm run prod` — start API in production mode

Quick commands:
```powershell
# Development (both servers)
npx concurrently "npm run dev" "cd backend && npm run dev"

# Production build and preview
npm run build && npx concurrently "npm run preview" "cd backend && npm start"
```

---

## 🔧 Environment Variables (backend/.env)

Create `backend/.env` with at least:

```
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>?retryWrites=true&w=majority"
PORT=5000
JWT_SECRET="your-super-secure-jwt-secret-change-this-in-production"
NODE_ENV=development
```

Use the provided `backend/.env.example` as a template.

**Security Notes:**
- ✅ Passwords are now hashed with bcrypt
- ✅ JWT secret is configurable via environment variable
- ✅ Input validation added to registration and login
- ⚠️ For production: Change JWT_SECRET, use strong MongoDB credentials, enable CORS for specific domains only

---

## 🏗️ Project Structure (overview)

```
TrackMySpend/
	index.html
	package.json                # frontend scripts (Vite, build, lint)
	vite.config.ts
	tailwind.config.js
	src/                        # React + TS app
		main.tsx
		App.tsx
		components/ ...           # UI, dashboard, forms, etc.
		pages/ ...                # Dashboard, Transactions, Login, etc.
		context/FinanceContext.tsx
	backend/
		package.json              # backend scripts (nodemon, start)
		server.js                 # Express app (PORT or 5000)
		routes/                   # auth, transactions, budgets, reminders, reset
		models/                   # User, Transaction, Budget, Reminder
```

---

## 🧪 Build & Preview (frontend)

```powershell
cd C:\Users\krish\TrackMySpend
npm run build
npm run preview
```

---

## ❗ Troubleshooting

- `'vite' is not recognized` when running `npm run dev` (frontend):
	- Make sure dependencies are installed: `npm install` in the repository root.
	- Running through `npm run dev` automatically adds local binaries to PATH.

- Cannot connect to MongoDB:
	- Verify `MONGO_URI` in `backend/.env`.
	- Check firewall/VPN and that your IP is allowlisted in MongoDB Atlas.
	- Copy from `backend/.env.example` if `.env` doesn't exist.

- Port already in use:
	- Change backend `PORT` in `backend/.env`.
	- For Vite, you can start on a different port with `npm run dev -- --port 5174`.

- `'concurrently' is not recognized`:
	- Use `npx concurrently` instead of global installation.
	- Or install globally: `npm install -g concurrently`.

- Authentication not working:
	- Check if backend is running and accessible.
	- Verify API_BASE_URL in frontend matches backend URL.
	- Check browser network tab for CORS errors.

- Sign up option missing:
	- ✅ Fixed! Login page now has "Sign up here" link.
	- ✅ Register page has "Sign in here" link.

---

## 📁 Project Structure

```
TrackMySpend/
├── docs/                      # Documentation files
│   ├── CHANGELOG.md          # Version history
│   ├── CONTRIBUTING.md       # Contribution guidelines
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── SECURITY.md           # Security policy
│   └── TESTING.md            # Testing guide
├── scripts/                   # Development scripts
│   ├── start-dev.bat         # Windows batch script
│   └── start-dev.ps1         # PowerShell script
├── src/                       # Frontend source code
│   ├── components/           # React components
│   ├── pages/                # Page components
│   ├── context/              # React context
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities
│   └── test/                 # Frontend tests
├── backend/                   # Backend source code
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   └── test/                 # Backend tests
├── .github/workflows/        # CI/CD workflows
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

## 🚀 Ready for Deployment?

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for complete deployment guide including:
- Vercel + Railway setup
- Environment variable configuration
- Security checklist
- Production optimization tips

---

## 📌 Notes

- ✅ **Security Improved**: Password hashing, JWT environment variables, input validation
- ✅ **Better UX**: Sign up/in navigation links, improved error messages
- ✅ **Development**: One-command startup for both servers
- ✅ **Production Ready**: Deployment guide, environment templates
- ⚠️ **For Production**: Follow [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) security checklist

## 📚 Documentation

- 📖 [Testing Guide](docs/TESTING.md) - Comprehensive testing documentation
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- 🤝 [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute
- 🔒 [Security Policy](docs/SECURITY.md) - Security and vulnerability reporting
- 📋 [Changelog](docs/CHANGELOG.md) - Version history and updates

## 🔗 What's New

### Recent Improvements:
1. **Financial Intelligence & Analytics Engine**
   - Category-wise burn rate and spending concentration metrics
   - Automated financial insight generation engine with test coverage
   - Safe CSV export sanitization with formula injection prevention

2. **Authentication Flow Fixed**
   - Added "Sign up here" link on login page
   - Added "Sign in here" link on register page
   - Better error handling and user feedback

2. **Security Enhancements**
   - Password hashing with bcrypt
   - Environment-based JWT secrets
   - Input validation for registration/login
   - Better error messages without exposing sensitive info

3. **Developer Experience**
   - One command to run both frontend and backend
   - Environment file templates
   - Improved backend API documentation page
   - Production deployment guide

4. **Production Ready**
   - Environment configuration
   - Security best practices
   - Deployment instructions for multiple platforms



