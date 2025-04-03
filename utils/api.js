const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const CRYPTO_API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Make sure this is in your .env.local

export async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error(`Weather API error: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch weather data." };
  }
}

export async function fetchCrypto() {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
    );

    if (!res.ok) throw new Error(`Crypto API error: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch crypto data." };
  }
}

export async function fetchNews() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=cryptocurrency&language=en`
    );

    if (!res.ok) throw new Error(`News API error: ${res.statusText}`);

    const data = await res.json();

    return Array.isArray(data.results) ? data.results : []; // Ensure it returns an array
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch news data." };
  }
}
