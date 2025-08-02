# 🎬 CineVerse - Mobile Movie Discovery App

**CineVerse** is a sleek and dynamic mobile application for discovering movies. Search for any film, browse real-time trending lists from Trakt.tv, and see what's popular among the app's users. Built with **React Native**, it features a modern, mobile-first interface and an efficient search experience designed for both iOS and Android.

---

## 📱 Screenshots

| Home Screen | Movie Details |
| :---------: | :-----------: |
| ![Home Screen](./screenshots/home.png) | ![Movie Details](./screenshots/details.png) |

> _Note: Replace the image paths with actual screenshots from your app._

---

## ✨ Features

- **Dynamic Header**  
  Engaging typing animation in the hero section of the home screen.

- **Real-time Movie Search**  
  Instantly search any movie using the Trakt.tv API.

- **Optimized API Requests**  
  Debounced search functionality to reduce API load and enhance performance.

- **Trending from Trakt.tv**  
  Default movie list shows current trending movies from Trakt.tv.

- **Community-Driven Trends**  
  Uses Appwrite backend to track and display the most searched movies by users.

- **Clean, Native UI**  
  Intuitive and responsive interface designed for mobile.

- **Native Navigation**  
  Navigate smoothly between movie cards and details using React Navigation.

---

## 🛠️ Tech Stack

### 📱 Mobile Frontend
- **React Native** – For cross-platform app development
- **React Navigation** – Screen navigation and routing
- **Axios** – API requests
- **Custom Debounce Hook** – Prevents excessive API calls

### 🗄️ Backend & Database
- **Appwrite** – Backend server to track user searches

### 🌐 APIs
- **Trakt.tv API** – Main movie data and trending lists
- **OMDb API** – Supplementary movie information

### 🎨 Styling
- **React Native StyleSheet** – Platform-agnostic styling

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following are installed:

- Node.js (v16+)
- npm or yarn
- React Native development environment  
  [Official Setup Guide](https://reactnative.dev/docs/environment-setup)

---

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
