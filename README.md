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
   git clone https://github.com/Varun-Sangwan/Music-Library-Core
   cd core-app

   ```

2. Install dependencies:

```sh
   npm install
```

3. Start the Music Library Micro Frontend first:
   ```sh
   cd ..
   git clone https://github.com/Varun-Sangwan/Music-Library-MFE
   cd music-library
   npm install
   npm run preview
   ```
4. Then, start the Core App:
   ```sh
   npm run dev
   ```
5. The login using below configured credentials
   ```sh
   admin/admin123
   user/user123
   ```

## Running Tests & Coverage

```sh
npm test
npx jest --coverage
```

## Micro Frontend Integration

The Music Library MFE is dynamically loaded via:

```sh
const MusicLibrary = React.lazy(() => import("musicLibrary/MusicLibrary"));
```

Remote is defined in vite.config.ts

```sh
remotes: {
musicLibrary: "http://localhost:3001/assets/remoteEntry.js"
}
```

## Tech Stack

**Frontend**: React, TypeScript, Tailwind CSS

**State Management**: React Context API

**Authentication**: JWT (In-Memory)

**Micro Frontend**: Vite + Module Federation

**Testing**: Jest, React Testing Library
