import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Book, Search } from 'lucide-react';
import logo from "../component/c131cc9c-0db6-457b-b5b2-c6606ce24b77.png"
const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      {/* Traditional MP-inspired decorative border */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-repeat-x" 
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=2000&h=10")`,
          opacity: 0.3
        }}
      />
      
      <header className="relative bg-gradient-to-r from-orange-900 via-red-800 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604549944235-108833b3b017?auto=format&fit=crop&q=80')] opacity-10 bg-repeat" />
        
        <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-2">
              डॉ हरिसिंह गौर विश्वविद्यालय, सागर, म.प्र.
            </h2>
            <p className="text-lg text-yellow-100">Dr. Harisingh Gour Vishwavidyalaya, Sagar, M.P.</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Central Library
                <motion.span 
                  className="block text-yellow-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ज्ञान की यात्रा
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg mb-8 text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Established in 1946, our library stands as a beacon of knowledge in Sagar, 
                Madhya Pradesh. Housing over 100,000 books and manuscripts, we preserve our 
                rich cultural heritage while embracing modern digital resources.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button 
                  className="bg-yellow-400 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/resources")}
                >
                  <Book className="w-5 h-5" />
                  Get Started
                </motion.button>
                <motion.button 
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-red-900 transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=> navigate("/browse-catalog")}
                >
                  <Search className="w-5 h-5" />
                  Browse Catalog
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="relative">
                <motion.img
                  src={logo}
                  
                  alt="Traditional Library Architecture"
                  className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 border-4 border-yellow-400 rounded-lg opacity-20" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Traditional MP-inspired decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-repeat-x transform rotate-180" 
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=2000&h=10")`,
            opacity: 0.3
          }}
        />
      </header>
    </div>
  );
};

export default HeroSection;