# Nightowl - Spotify Music Discovery App

A modern web application that allows users to connect with Spotify and view their profile using the PKCE (Proof Key for Code Exchange) authentication flow.

## Features

- 🔐 Secure Spotify authentication using PKCE flow
- 👤 View Spotify profile information
- 🎨 Modern UI with Shadcn components
- 📱 Responsive design
- 🔄 Automatic token refresh

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: Spotify Web API with PKCE
- **State Management**: React Context

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Spotify Developer account
- A Spotify app created in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Nightowl
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Spotify App Configuration

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app or use an existing one
3. Add the following redirect URI to your app settings:
   - `http://localhost:3000/callback` (for development)
   - `https://yourdomain.com/callback` (for production)
4. Copy your **Client ID** (you'll need this for the environment variables)

### 4. Environment Variables

Update your `.env.local` file with the correct Spotify configuration:

```bash
# Spotify API Configuration
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

**Important Notes:**

- For PKCE flow, you don't need the client secret in the frontend
- The client secret should only be used in secure backend environments
- Make sure the redirect URI matches exactly what you configured in your Spotify app

### 5. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Authentication Flow

1. **User clicks "Continue with Spotify"** on the landing page
2. **PKCE Code Verifier & Challenge** are generated
3. **User is redirected** to Spotify's authorization page
4. **User grants permissions** and is redirected back to `/callback`
5. **Authorization code is exchanged** for access and refresh tokens
6. **User profile is fetched** and displayed

### File Structure

```
app/
├── _components/
│   ├── Landing.tsx              # Landing page with Spotify login
│   ├── SpotifyLoginButton.tsx   # Spotify authentication button
│   ├── SpotifyProfile.tsx       # User profile display
│   ├── SpotifyCallback.tsx      # OAuth callback handler
│   └── ui/
│       └── button.tsx           # Shadcn button component
├── _utils/
│   └── Spotify/
│       ├── auth.ts              # PKCE authentication utilities
│       └── SpotifyContext.tsx   # React context for state management
├── callback/
│   └── page.tsx                 # Callback route
├── profile/
│   └── page.tsx                 # Profile route
└── page.tsx                     # Main landing page
```

## API Endpoints

The app uses the following Spotify Web API endpoints:

- `GET /me` - Get current user's profile
- `POST /api/token` - Exchange authorization code for tokens

## Security Features

- **PKCE Flow**: Uses Proof Key for Code Exchange for enhanced security
- **No Client Secret in Frontend**: Client secret is not exposed in the browser
- **Secure Token Storage**: Tokens are stored in localStorage (consider using httpOnly cookies for production)
- **Automatic Token Refresh**: Handles token expiration automatically

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Environment Variables

| Variable                           | Description                  | Required |
| ---------------------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`    | Your Spotify app's client ID | Yes      |
| `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` | OAuth redirect URI           | Yes      |

## Production Deployment

1. Update the redirect URI in your Spotify app settings
2. Set the production environment variables
3. Build and deploy your application

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**

   - Ensure the redirect URI in your Spotify app settings matches exactly
   - Check for trailing slashes and protocol (http vs https)

2. **"Invalid client" error**

   - Verify your `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` is correct
   - Make sure your Spotify app is properly configured

3. **"Code verifier not found" error**
   - Clear localStorage and try again
   - Ensure the PKCE flow is working correctly


## Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [PKCE Flow Tutorial](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
