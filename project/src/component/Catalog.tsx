import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Search,  BookOpen, User, FileText, Youtube, Newspaper, Filter, GraduationCap, BookMarked, HomeIcon } from 'lucide-react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ResourceType = 'books' | 'research' | 'videos' | 'magazines';

interface Resource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  category: string;
  language: string;
  available: boolean;
  coverUrl: string;
  description?: string;
  fileUrl?: string;
}

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType>('books');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() =>{
    const fetchResources = async () =>{
          try{
            const res = await axios.get("http://localhost:5000/api/v1/getcatalog");
            setResources(res.data.data);
            //console.log(res.data);
          }
          catch(error){
            console.log(error);
          }
        };
        fetchResources();
      
  }, []);
  
  

  const categories = {
    books: ['Sanskrit', 'Science', 'History', 'Literature', 'Philosophy'],
    research: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    videos: ['Lectures', 'Tutorials', 'Seminars', 'Workshops'],
    magazines: ['Science', 'Arts', 'Technology', 'Culture']
  };

  const languages = ['Hindi', 'English', 'Sanskrit'];
  const navigate = useNavigate();
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    
    return matchesSearch && matchesType && matchesCategory && matchesLanguage;
  });

  const getIcon = (type: ResourceType) => {
    switch (type) {
      case 'books': return <BookMarked />;
      case 'research': return <FileText />;
      case 'videos': return <Youtube />;
      case 'magazines': return <Newspaper />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Traditional Header */}
      <div className="bg-gradient-to-r from-orange-900 via-red-800 to-red-900 p-8">
        <div className="container mx-auto">
        <button
        onClick={() => navigate('/')}
        className="text-white px-4 py-2 rounded hover:bg-gray-400 transition flex items-center gap-2 bg-yellow-500"
      >
        <HomeIcon size={18} />
        Home
      </button>
          <h1 className="text-4xl font-bold text-yellow-300 text-center mb-2">डिजिटल संसाधन</h1>
          <p className="text-yellow-100 text-center">Digital Resources</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:w-64 bg-white rounded-lg shadow-lg p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-orange-900 mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>

            {/* Resource Types */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Resource Type</h3>
              <div className="space-y-2">
                {(['books', 'research', 'videos', 'magazines'] as ResourceType[]).map(type => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left ${
                      selectedType === type 
                        ? 'bg-orange-100 text-orange-900' 
                        : 'hover:bg-orange-50'
                    }`}
                  >
                    {getIcon(type)}
                    <span className="capitalize">{type}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Category</h3>
              <select
                className="w-full bg-orange-50 text-orange-900 p-2 rounded-lg border-2 border-orange-100 focus:outline-none focus:border-orange-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories[selectedType].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Language</h3>
              <select
                className="w-full bg-orange-50 text-orange-900 p-2 rounded-lg border-2 border-orange-100 focus:outline-none focus:border-orange-300"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="all">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Resources Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredResources.map(resource => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-100 hover:border-orange-300 transition-all"
                  >
                    <div className="relative h-48">
                      <img
                        src={resource.coverUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className="px-3 py-1 rounded-full text-sm bg-orange-500 text-white capitalize">
                          {resource.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <User className="w-4 h-4 mr-2" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {resource.category}
                        </span>
                        <span className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {resource.language}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/browse-catalog/${resource.id}`)}
                      //onClick={() => navigate('/')}
                      className="w-full bg-orange-900 text-yellow-300 py-3 flex items-center justify-center gap-2 hover:bg-orange-800 transition-colors"
                    >
                      {getIcon(resource.type)}
                      Access Resource
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CatalogPage;