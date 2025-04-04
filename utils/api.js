

export async function fetchWeather(city) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  if (!API_KEY) {
    console.error("Missing Weather API key");
    return { error: "Missing API key" };
  }
  
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!res.ok) throw new Error(`Weather API error: ${res.statusText}`);
    
    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch weather data." };
  }
}

export async function fetchCrypto() {
  
  const CRYPTO_API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
  try {
    const ids = "bitcoin,ethereum,dogecoin,solana,cardano,polkadot";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch crypto data");

    return await res.json();
  } catch (error) {
    console.error("Crypto API error:", error);
    return { error: "Failed to load crypto data" };
  }
}

export async function fetchNews(query = "cryptocurrency", country = "us") {
  const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_7797268aff8a21eb026533ed940fceb488564&q=${query}&country=${country}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

