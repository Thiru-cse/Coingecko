const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="flex w-full sm:w-auto gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coins..."
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
