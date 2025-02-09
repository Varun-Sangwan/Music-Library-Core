# Core App - Music Library 🎵

## Overview

The **Core App** serves as the main container application for the **Music Library Micro Frontend (MFE)**. It dynamically loads the `music-library` remote module using **Module Federation with Vite**.

## Features

- Loads the **Music Library Micro Frontend** dynamically
- Implements **authentication and role-based access control**
- Uses **React Router** for navigation
- **Lazy loads** the Music Library to improve performance
- **100%+ unit test coverage** with Jest & React Testing Library

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/core-app.git
   cd core-app
   ```
2. Install dependencies:
   npm install
3. Start the Music Library Micro Frontend first:
   cd ../music-library
   npm install
   npm run preview
4. Then, start the Core App:
   npm run dev

## Running Tests & Coverage

npm test
npx jest --coverage

## Micro Frontend Integration

The Music Library MFE is dynamically loaded via:

const MusicLibrary = React.lazy(() => import("musicLibrary/MusicLibrary"));

Remote is defined in vite.config.ts

remotes: {
musicLibrary: "http://localhost:3001/assets/remoteEntry.js"
}

## Tech Stack

Frontend: React, TypeScript, Tailwind CSS
State Management: React Context API
Authentication: JWT (In-Memory)
Micro Frontend: Vite + Module Federation
Testing: Jest, React Testing Library
