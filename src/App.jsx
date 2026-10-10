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

        <section className="profile-card" aria-labelledby="kohli-heading">
          <img
            className="profile-photo"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"
            alt="Virat Kohli during the India versus Australia Test match in 2023"
            loading="lazy"
          />
          <div className="profile-copy">
            <p className="eyebrow">Cricket spotlight</p>
            <h2 id="kohli-heading">Virat Kohli</h2>
            <p>
              Virat Kohli is an Indian international cricketer from New Delhi,
              known for his right-handed batting and consistent performances.
              He has represented India across international formats and has
              also captained the national team.
            </p>
            <a
              className="photo-credit"
              href="https://commons.wikimedia.org/wiki/File:Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"
              target="_blank"
              rel="noreferrer"
            >
              Photo: Prime Minister&apos;s Office, Government Open Data License
              (India)
            </a>
          </div>
        </section>

        <footer className="page-footer">A little sunshine for wherever you are.</footer>
      </main>
    </div>
  );
}
