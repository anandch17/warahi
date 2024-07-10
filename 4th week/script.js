document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weatherForm");
    const weatherChartCanvas = document.getElementById("weatherChart");
    let weatherChart;

    weatherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = e.target.city.value;
        if (!city) {
            e.stopPropagation();
            weatherForm.classList.add("was-validated");
            return;
        }
        try {
            const weatherData = await getWeatherData(city);
            if (weatherData) {
                const formattedData = formatWeatherData(weatherData);
                displayWeatherChart(weatherChartCanvas, formattedData);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        }
    });

    const getWeatherData = async (city) => {
        const apiKey = '1eaa01b1e46371147c315d0bad88a576'
        const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Weather data fetched successfully:", data);
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const formatWeatherData = (data) => {
        const labels = data.list.map(item => new Date(item.dt_txt).toLocaleString());
        const temperatures = data.list.map(item => item.main.temp);
        return { labels, temperatures };
    };

    const displayWeatherChart = (canvas, data) => {
        const { labels, temperatures } = data;
        const ctx = canvas.getContext('2d');
        if (weatherChart) {
            weatherChart.destroy();
        }
        weatherChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };
});
