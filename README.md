# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Environment Variables

Create a `.env` file in the project root and add the following:

```dotenv
BACKEND_HOST=http://localhost:8000
FRONTEND_HOST=http://localhost:3000
```

- BACKEND_HOST: The host of the backend server
- FRONTEND_HOST: The host of the frontend server

The values are the one by default, they are also defined in the .env.sample file,
which you can copy, paste and rename to `.env`.

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
