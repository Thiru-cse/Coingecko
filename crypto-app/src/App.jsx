import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CoinTable from "./components/CoinTable";
import "./App.css"

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const coinsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "inr",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => setCurrentPage(1);

  const filteredCoins = coins
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .filter((coin) => {
      if (filter === "<100") return coin.current_price < 100;
      if (filter === "100-1000")
        return coin.current_price >= 100 && coin.current_price <= 1000;
      if (filter === ">1000") return coin.current_price > 1000;
      return true;
    });

  const indexOfLast = currentPage * coinsPerPage;
  const indexOfFirst = indexOfLast - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Tracker</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="all">All Prices</option>
          <option value="<100">Below ₹100</option>
          <option value="100-1000">₹100 to ₹1000</option>
          <option value=">1000">Above ₹1000</option>
        </select>
      </div>

      <CoinTable coins={currentCoins} />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded bg-gray-300"
        >
          ⬅ Prev
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 rounded bg-gray-300"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default App;
