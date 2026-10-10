import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
export default function Infobox({ weather }) {
    const description = weather?.description?.toLowerCase() ?? '';
    const conditionIcon = description.includes('thunder')
        ? '⛈'
        : description.includes('snow')
            ? '❄'
            : description.includes('rain') || description.includes('drizzle')
                ? '🌧'
                : description.includes('cloud') || description.includes('overcast')
                    ? '☁'
                    : description.includes('fog')
                        ? '🌫'
                        : '☀';

    return (
        <Card className="weather-card">
            <CardContent className="weather-card-content">
                <div className="weather-card-header">
                    <Box>
                        <Typography className="weather-card-kicker">Weather report</Typography>
                        <Typography className="weather-city">
                            {weather?.city ?? 'Your city, your forecast'}
                        </Typography>
                    </Box>
                    <Chip
                        className="weather-description"
                        label={weather?.description ?? 'Ready when you are'}
                    />
                </div>

                <div className="weather-hero">
                    <Box>
                        <Typography className="weather-temperature">
                            {weather ? `${Math.round(weather.temp)}°` : '--°'}
                        </Typography>
                        <Typography className="weather-units">Celsius</Typography>
                        <Typography className="weather-feels">
                            Feels like {weather ? `${Math.round(weather.feelsLike)}°` : '--°'}
                        </Typography>
                    </Box>
                    <div className="weather-icon" aria-hidden="true">{conditionIcon}</div>
                </div>

                <div className="weather-stats">
                    <Box className="weather-stat">
                        <Typography className="weather-stat-label">Humidity</Typography>
                        <Typography className="weather-stat-value">
                            {weather ? `${weather.humidity}%` : '--'}
                        </Typography>
                    </Box>
                    <Box className="weather-stat">
                        <Typography className="weather-stat-label">Pressure</Typography>
                        <Typography className="weather-stat-value">
                            {weather ? `${Math.round(weather.pressure)} hPa` : '--'}
                        </Typography>
                    </Box>
                    <Box className="weather-stat">
                        <Typography className="weather-stat-label">Wind speed</Typography>
                        <Typography className="weather-stat-value">
                            {weather ? `${weather.windSpeed} m/s` : '--'}
                        </Typography>
                    </Box>
                </div>
            </CardContent>
        </Card>
    );
}