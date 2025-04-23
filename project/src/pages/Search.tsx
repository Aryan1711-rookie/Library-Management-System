import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/resources?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Find Your Next Book
          </motion.h2>
          <motion.div 
            className="flex items-center bg-white border-2 border-gray-300 rounded-lg p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <SearchIcon className="w-6 h-6 text-gray-400 mx-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by title, author, or ISBN..."
              className="w-full px-4 py-2 outline-none"
            />
            <motion.button 
              className={`px-6 py-2 rounded-md transition ${
                searchQuery.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={{ scale: searchQuery.trim() ? 1.05 : 1 }}
              whileTap={{ scale: searchQuery.trim() ? 0.95 : 1 }}
              onClick={handleSearch}
              disabled={!searchQuery.trim()} 
            >
              Search
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Search;