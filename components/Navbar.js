export default function Navbar() {
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">CryptoWeather Nexus</h1>
        <div className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/weather" className="hover:underline">Weather</a>
          <a href="/crypto" className="hover:underline">Crypto</a>
          <a href="/news" className="hover:underline">Trending News</a>
        </div>
      </nav>
    );
  }
  