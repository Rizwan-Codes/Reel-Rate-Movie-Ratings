# 🎬 ReelRate

ReelRate is a modern movie discovery web application built with
**React.js**. It allows users to search for movies, view detailed
information, and maintain a personal **My List** of favorite movies.

## ✨ Features

-   🔎 Movie search using the OMDb API
-   ⏳ Debounced search to reduce unnecessary API requests
-   🎞️ Reusable movie cards
-   📖 Detailed movie information in a modal
-   ❤️ Add and remove movies from My List
-   💾 Persist favorites with `localStorage`
-   🔄 Persist the current Search/My List view after refresh
-   ⚡ Loading, error, and empty states
-   📱 Responsive interface
-   🧩 Component-based React architecture

## 🛠️ Tech Stack

-   React.js
-   JavaScript (ES6+)
-   Tailwind CSS
-   OMDb API
-   React Hooks
-   Context API
-   Custom Hooks
-   localStorage
-   Vite
-   Git & GitHub

## 📂 Project Structure

``` text
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── MovieGrid.jsx
│   ├── MovieCard.jsx
│   ├── MovieModal.jsx
│   └── FavoritesPage.jsx
│
├── context/
│   └── FavoritesContext.jsx
│
├── hooks/
│   └── useDebounce.js
│
├── config.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔄 How It Works

### Movie Search

``` text
User types a movie name
        ↓
Search query state updates
        ↓
Debounce waits for typing to stop
        ↓
OMDb API request
        ↓
Search results received
        ↓
Movies stored in React state
        ↓
MovieGrid renders MovieCards
```

### Movie Details

When a movie is selected, its IMDb ID is used to request detailed
information from OMDb:

``` text
MovieCard
   ↓
IMDb ID
   ↓
OMDb API
   ↓
Detailed movie data
   ↓
MovieModal
```

### Favorites

Favorites are managed with the React Context API:

``` text
MovieCard
   ↓
useFavorites()
   ↓
FavoritesContext
   ↓
favorites state
   ↓
localStorage
```

When the application starts, saved favorites are read from
`localStorage` and restored into React state.

### Persistent View

The application also stores the current view:

``` text
Search
   or
My List
```

in `localStorage`. Therefore, refreshing the browser keeps the user on
the same view.

## 🧠 React Concepts Practiced

### State Management

`useState` is used for:

-   Search query
-   Movie results
-   Selected movie
-   Current view
-   Favorites

### Side Effects

`useEffect` is used for:

-   Fetching movie data
-   Synchronizing favorites with localStorage
-   Persisting the current view
-   Handling debounced values

### Context API

Favorites are shared through Context API so multiple components can
access and update the same favorites state without unnecessary prop
drilling.

### Custom Hook

A custom `useDebounce` hook delays the search request until the user
stops typing for a short period.

### Conditional Rendering

The UI responds to different application states such as:

-   Loading
-   Errors
-   No results
-   Search results
-   My List
-   Movie details

## 🌐 API Integration

ReelRate uses the **OMDb API**.

Movie search uses the API's search parameter:

``` text
?s=movie-name&type=movie
```

Detailed movie information is requested using an IMDb ID:

``` text
?i=IMDb_ID&plot=full
```

The API response is converted from JSON and then used to render the
React UI.

## 💾 Local Storage

ReelRate uses browser `localStorage` to persist:

``` text
favorites
view
```

This means refreshing the page does not remove saved movies or reset the
current Search/My List view.

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone YOUR_REPOSITORY_URL
```

### 2. Enter the project

``` bash
cd reelrate
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Configure the OMDb API

Add your OMDb API key using the project's configuration/environment
setup.

**Important:** Do not expose private API credentials in a public GitHub
repository. Use environment variables for production applications and
add secret files to `.gitignore`.

### 5. Start the development server

``` bash
npm run dev
```

Open the local URL provided by Vite.

## 📸 Main Sections

-   Search View
-   Movie Search Results
-   Movie Details Modal
-   My List / Favorites
-   Responsive Navigation

## 🎯 What I Learned

This project helped me practice:

-   Reusable React components
-   React Hooks
-   REST API integration
-   `async/await`
-   `fetch()`
-   JSON API responses
-   URL query parameters
-   Debouncing
-   Context API
-   Custom Hooks
-   `localStorage`
-   Conditional rendering
-   Loading and error handling
-   React project structure
-   Git and GitHub workflow

## 🔮 Future Improvements

-   User authentication
-   Cloud synchronization for favorites
-   Advanced movie filters
-   Sorting by rating, year, or title
-   Pagination or infinite scrolling
-   Watch history
-   Theme preferences
-   Improved accessibility
-   Production backend for securely handling API credentials

## 👨‍💻 Author

**Rizwan Ali**

BSCS Graduate \| Front-End Developer

Focused on building modern web applications with **React.js, JavaScript,
and modern front-end technologies**.

------------------------------------------------------------------------

⭐ If you find this project useful, consider giving the repository a
star.
