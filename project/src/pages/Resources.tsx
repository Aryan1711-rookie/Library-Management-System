import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookCopy,
  FileText,
  Headphones,
  Search,
  Home as HomeIcon,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import axios from 'axios';

interface Resource {
  id: string;
  title: string;
  author: string;
  subject: string;
  format: string;
  semester: string;
  thumbnail: string;
  fileUrl: string;
}

function Resources() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [ 'Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Literature', 'History' ];
  const formats = [ 'E-books', 'PDF', 'Audiobooks', 'Research Papers', 'Lecture Notes' ];
  const semesters = [ 'Fall 2024', 'Spring 2025', 'Summer 2025' ];

  useEffect(() =>{
    const fetchResources = async () =>{
      try{
        const res = await axios.get("https://library-management-system-l5gr.onrender.com/api/v1/getresources");
        setResources(res.data.data);
        //console.log(res.data);
      }
      catch(error){
        console.log(error);
      }
    };
    fetchResources();
  }, []);
  const filteredResources = resources.filter(resource => {
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesFormat = selectedFormat === 'all' || resource.format === selectedFormat;
    const matchesSemester = selectedSemester === 'all' || resource.semester === selectedSemester;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesFormat && matchesSemester && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-red-900 text-white py-8 relative">
  <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    
    {/* Title + Subtitle */}
    <div>
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Digital Resources
      </motion.h1>
      <motion.p
        className="text-md sm:text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Access our comprehensive collection of digital materials
      </motion.p>
    </div>

    {/* Home + Back Buttons */}
    <div className="flex  sm:flex-row gap-3 sm:gap-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-blue-900 px-4 py-2 rounded hover:bg-gray-200 transition flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <button
        onClick={() => navigate('/')}
        className="text-white px-4 py-2 rounded hover:bg-gray-400 transition flex items-center gap-2 bg-yellow-500"
      >
        <HomeIcon size={18} />
        Home
      </button>
    </div>
  </div>
</header>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="all">All Formats</option>
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="all">All Semesters</option>
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {resource.format === 'E-books' && <BookCopy className="w-5 h-5 text-blue-500 mr-2" />}
                    {resource.format === 'PDFs' && <FileText className="w-5 h-5 text-red-500 mr-2" />}
                    {resource.format === 'Audiobooks' && <Headphones className="w-5 h-5 text-green-500 mr-2" />}
                    <span className="text-sm font-medium text-gray-500">{resource.format}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">by {resource.author}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {resource.subject}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {resource.semester}
                    </span>
                  </div>
                  <motion.button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/resource/${resource.id}`)}
                  >
                    Access Resource
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Resources;
