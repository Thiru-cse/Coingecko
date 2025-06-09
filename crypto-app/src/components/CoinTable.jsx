const CoinTable = ({ coins }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-800 text-sm uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Price (INR)</th>
            <th className="px-4 py-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <tr
              key={coin.id}
              className="border-b hover:bg-indigo-50 transition-all"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {coin.market_cap_rank}
              </td>
              <td className="px-4 py-3 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name}</span>
              </td>
              <td className="px-4 py-3">
                ₹{coin.current_price.toLocaleString()}
              </td>
              <td className="px-4 py-3">₹{coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
