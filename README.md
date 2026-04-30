# Next.js Form Prototype Template

Lightweight Next.js app optimized for form prototypes and user research.

## What This Template Is For

- User research and testing
- Form prototypes
- Feedback collection
- Rapid UI iteration

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zod validation
- Jotai (client state, if needed)

## Local Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

App runs on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=3000
NODE_ENV=development
APP_NAME=nextjs-form-prototype
```

## Available Routes

- `GET /` - Form UI
- `GET /health` - Health check (returns `{ "status": "ok" }`)
- `POST /api/submit` - Form submission endpoint with Zod validation

## Form Features

- Client-side validation with Zod
- Real-time error display
- Success message on submit
- Responsive design with Tailwind
- No database required (mocked API response)

## Docker

### Build Docker Image

```bash
docker build -t prototype-nextjs-form .
```

### Run Docker Container

```bash
docker run --rm -p 3000:3000 --env-file .env.example prototype-nextjs-form
```

Test health check:
```bash
curl http://localhost:3000/health
```

## Deployment Configuration

- **Default Port:** 3000
- **Health Check Path:** `/health`
- **Health Check Response:** `{ "status": "ok" }`
- **Container Listens On:** `0.0.0.0:3000` (configured via Next.js `--hostname` flag)

## Important Implementation Notes

- Uses Next.js standalone output for smaller Docker images
- Server binds to `0.0.0.0` (required for Docker)
- No database required by default
- Validation handled with Zod
- Tailwind for styling
- No hardcoded secrets or VM paths

## Deployment to Prototype VM

This template deploys as a Docker container:

1. Main website creates repo from template
2. GitHub Actions builds Next.js app
3. Docker image pushed to ACR
4. Container deployed on prototype VM
5. Caddy routes traffic
6. Health checks via `/health`

The deployment system expects:
- One Docker image
- One exposed port (3000)
- One health check endpoint (/health)
- No manual configuration
