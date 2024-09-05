import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import cors package

const app = express();

// Use CORS middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send("Server is ready");
});

app.get('/api/weather', async (req, res) => {
    const apiKey = '644b1b0c553a0875ae8fa847850e7302'; // Replace with your actual API key
    const city = req.query.city || 'delhi'; // Default city if none is provided

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // You can change this to 'imperial' if you prefer Fahrenheit
            }
        });

        const weatherData = response.data;

        console.log('Weather Data:', weatherData);
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const mintemp = weatherData.main.temp_max;
        const maxtemp = weatherData.main.temp_min;
        const feels_like=weatherData.main.feels_like;
        const windSpeed = weatherData.wind.speed;
        const description = weatherData.weather[0].description;
        const cityName = weatherData.name;
        const formattedData = {
            city: cityName,
            temperature: `${temp} °C`,
            humidity: `${humidity} %`,
            windSpeed: `${windSpeed} m/s`,
            feels_like:`${feels_like} °C`,
            maxtemp:`${maxtemp} °C`,
            mintemp:`${mintemp} °C`,
            description: description.charAt(0).toUpperCase() + description.slice(1) // Capitalize first letter
        };

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching weather data');
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
