const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const CRYPTO_API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

export async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return res.json();
}

export async function fetchCrypto() {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`);
  return res.json();
}
