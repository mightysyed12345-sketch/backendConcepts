import { useState } from 'react';
import SearchBox from './assets/searchbox.jsx';
import './App.css';
import Infobox from './assets/infobox.jsx';

export default function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="weather-app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          SKYCAST
        </div>
        <div className="live-indicator"><span /> Live weather</div>
      </header>

      <main className="dashboard">
        <section className="intro">
          <p className="eyebrow">Your day, forecast</p>
          <h1>Weather, made simple.</h1>
          <p>Find current conditions for any city around the world.</p>
        </section>

        <SearchBox onWeatherUpdate={setWeather} />

        <p className="section-label">CURRENT CONDITIONS</p>
        <Infobox weather={weather} />

        <footer className="page-footer">A little sunshine for wherever you are.</footer>
      </main>
    </div>
  );
}
