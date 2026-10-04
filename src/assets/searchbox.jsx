import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './searchBox.css';

const GEOCODING_URL = import.meta.env.DEV
    ? '/api/geocoding'
    : 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = import.meta.env.DEV
    ? '/api/weather'
    : 'https://api.open-meteo.com/v1/forecast';

const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    56: 'Freezing drizzle',
    57: 'Heavy freezing drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Heavy freezing rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Light rain showers',
    81: 'Rain showers',
    82: 'Heavy rain showers',
    85: 'Light snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
};

async function fetchCityWeather(cityName, signal, onLoadingStep = () => {}) {
    const geocodingUrl = new URL(GEOCODING_URL, window.location.origin);
    geocodingUrl.search = new URLSearchParams({
        name: cityName.trim(),
        count: '1',
        language: 'en',
        format: 'json',
    });

    const locationResponse = await fetch(geocodingUrl, { signal });
    if (!locationResponse.ok) {
        throw new Error('Could not look up that city. Please try again.');
    }
    const locationData = await locationResponse.json();
    const location = locationData.results?.[0];
    if (!location) {
        throw new Error('City not found. Check the spelling and try again.');
    }

    onLoadingStep();
    const weatherUrl = new URL(WEATHER_URL, window.location.origin);
    weatherUrl.search = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m',
        wind_speed_unit: 'ms',
        timezone: 'auto',
    });

    const weatherResponse = await fetch(weatherUrl, { signal });
    if (!weatherResponse.ok) {
        throw new Error('Could not retrieve weather for that city. Please try again.');
    }
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    if (!current) {
        throw new Error('The weather service returned incomplete data. Please try again.');
    }

    return {
        city: [location.name, location.country].filter(Boolean).join(', '),
        temp: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        pressure: current.surface_pressure,
        windSpeed: current.wind_speed_10m,
        description: weatherDescriptions[current.weather_code] ?? 'Weather unavailable',
    };
}

export default function SearchBox({ onWeatherUpdate }) {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState('Finding city…');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const getWeather = useCallback(async (cityName, showLoading = true) => {
        if (showLoading) {
            setLoading(true);
            setLoadingStep('Finding city…');
            setError('');
        }
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 30000);

        try {
            const weather = await fetchCityWeather(
                cityName,
                controller.signal,
                showLoading ? () => setLoadingStep('Loading weather…') : undefined
            );
            onWeatherUpdate(weather);
            return true;
        } catch (requestError) {
            setError(
                requestError.name === 'AbortError'
                    ? 'The weather service did not respond within 30 seconds. Check your connection and try again.'
                    : requestError instanceof TypeError
                        ? 'Could not connect to the weather service. Check your internet connection and try again.'
                        : requestError.message || 'Unable to fetch weather. Please try again.'
            );
            return false;
        } finally {
            window.clearTimeout(timeoutId);
            setLoadingStep('');
            setLoading(false);
        }
    }, [onWeatherUpdate]);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 30000);

        async function loadInitialWeather() {
            try {
                const weather = await fetchCityWeather('Hyderabad', controller.signal);
                onWeatherUpdate(weather);
            } catch (requestError) {
                setError(
                    requestError.name === 'AbortError'
                        ? 'The Hyderabad weather request timed out. Check your connection and try again.'
                        : requestError instanceof TypeError
                            ? 'Could not connect to the weather service. Check your internet connection and try again.'
                            : requestError.message || 'Unable to load Hyderabad weather.'
                );
            } finally {
                window.clearTimeout(timeoutId);
                setLoading(false);
            }
        }

        loadInitialWeather();
        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [onWeatherUpdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city.trim() || loading) return;
        const success = await getWeather(city);
        if (success) {
            setCity('');
        }
    };

    return (
        <div className="SearchBox">
            <h2>Search a location</h2>
            <p className="search-description">Enter a city name to see its latest weather.</p>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City name"
                    placeholder="e.g. Hyderabad"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? loadingStep : 'Search'}
                </Button>
            </form>
            {error && <p className="search-error" role="alert">{error}</p>}
        </div>
    );
}