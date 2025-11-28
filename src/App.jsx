import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import { toast } from "react-toastify";
import Skeleton from "./components/Skeleton";

const API_URL = import.meta.env.VITE_APP_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const cityHandler = async (event) => {
    let value = event.target.value;
    setCityName(value);

    if (value.trim().length >= 1) {
      setLoading(true);
      try {
        let res = await fetch(
          `${API_URL}/search.json?key=${API_KEY}&q=${value}`
        );
        let data = await res.json();

        const filtered = data.filter((city) =>
          city.name.toLowerCase().includes(value.toLowerCase())
        );

        if (
          filtered.some(
            (city) => city.name.toLowerCase() === value.trim().toLowerCase()
          )
        ) {
          setSuggestions([]);
        } else {
          setSuggestions(filtered);
        }
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchWeatherData = async (queryCity) => {
    setLoading(true);
    try {
      let data = await fetch(
        `${API_URL}/current.json?key=${API_KEY}&q=${
          queryCity || cityName.trim()
        }`
      );

      let response = await data.json();
      setWeatherData(response);
      console.log(response);
    } catch (error) {
      toast.error("Network Issue!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        event.preventDefault();
      } else if (event.key === "Enter" && highlightedIndex >= 0) {
        handleSuggestionClick(suggestions[highlightedIndex].name);
        event.target.blur();
        event.preventDefault();
      } else if (event.key === "Enter") {
        const match = suggestions.find(
          (city) => city.name.toLowerCase() === cityName.trim().toLowerCase()
        );
        if (match) {
          handleSuggestionClick(match.name);
          event.target.blur();
          event.preventDefault();
        } else {
          setWeatherData({});
          setLoading(true);
        }
      }
    } else if (event.key === "Enter") {
      setWeatherData({});
      setLoading(true);
    }
  };

  const handleSuggestionClick = (name) => {
    setCityName(name);
    setSuggestions([]);
    setHighlightedIndex(-1);
    fetchWeatherData(name);
  };

  useEffect(() => {
    if (!cityName.trim()) return;

    const match = suggestions.find(
      (city) => city.name.toLowerCase() === cityName.trim().toLowerCase()
    );

    if (
      match &&
      weatherData?.location?.name?.toLowerCase() !==
        cityName.trim().toLowerCase()
    ) {
      const query = `${match.name}, ${match.region}, ${match.country}`;
      fetchWeatherData(query);
    }
  }, [cityName, suggestions]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 sm:px-6 lg:px-12 py-6">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 drop-shadow-lg text-center">
          Weather App
        </h1>

        {/* Input Box */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg relative">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter city name"
              onChange={cityHandler}
              value={cityName}
              className="w-full px-4 py-3 rounded-full bg-slate-900/70 text-white placeholder-slate-300 
                 border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-slate-800 text-white rounded-lg shadow-lg">
              {suggestions.map((city, idx) => (
                <li
                  key={city.id}
                  className={`px-4 py-2 hover:bg-slate-700 cursor-pointer ${
                    idx === highlightedIndex ? "bg-slate-700" : ""
                  }`}
                  onClick={() => handleSuggestionClick(city.name)}
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Separator */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-[pulse_2s_infinite] rounded-full"></div>

        {/* Card */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          {loading ? <Skeleton /> : <Card weatherData={weatherData} />}
        </div>
      </div>
    </>
  );
}

export default App;
