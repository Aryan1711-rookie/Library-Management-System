import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Book, User, FileText, Loader2, ArrowLeft, Maximize2, Bot, X, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

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

function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/resource/${id}`);
        if (res.data && res.data.data) {
          setResource(res.data.data);
        } else {
          setError("Resource not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch resource");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  const generateSummary = async () => {
    if (!resource) return;
    
    setIsGeneratingSummary(true);
    setSummaryError(null);
    
    try {
      const prompt = `Generate a concise 150-word summary of the book "${resource.title}" by ${resource.author}. 
      Focus on the main themes, key ideas, and significance of the work. 
      If you don't have information about this specific book, provide a general description based on the title and author's typical style.`;
      
      const res = await axios.post('http://localhost:5000/api/v1/gemini', {
        message: prompt
      });
      
      setSummary(res.data.reply);
    } catch (err) {
      console.error("Summary generation error:", err);
      setSummaryError("Failed to generate summary. Please try again.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-orange-900"
        >
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading resource...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 text-orange-900 hover:text-orange-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Resource Not Found</h2>
          <p className="text-gray-600">The requested resource could not be found.</p>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 text-orange-900 hover:text-orange-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-4 right-4 z-50 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          <iframe
            src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full"
            title="Resource Fullscreen View"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-orange-900 hover:text-orange-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Resource Header */}
                <div className="bg-gradient-to-r from-orange-900 via-red-800 to-red-900 p-6 text-white relative">
                  <div className="absolute right-6 top-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full bg-yellow-400 text-orange-900 hover:bg-yellow-300 transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    {resource.title || "Untitled Resource"}
                  </h1>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-yellow-300" />
                      <span>{resource.author || "Unknown Author"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-yellow-300" />
                      <span>{resource.subject || "No Subject"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-yellow-300" />
                      <span>{resource.format || "Unknown Format"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-yellow-300" />
                      <span>Semester: {resource.semester || "Not Specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Resource Viewer */}
                <div className="p-6">
                  {resource.fileUrl ? (
                    <div className="w-full h-[70vh]">
                      <iframe
                        src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border rounded-lg"
                        title="Resource Viewer"
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4" />
                      <p>No file available for this resource</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 h-fit"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-orange-900 flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  AI Summary
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateSummary}
                  disabled={isGeneratingSummary}
                  className="px-4 py-2 bg-orange-900 text-yellow-300 rounded-lg hover:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isGeneratingSummary ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      Generate Summary
                    </>
                  )}
                </motion.button>
              </div>

              {summaryError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600 text-sm">{summaryError}</p>
                </div>
              )}

              <div className="bg-orange-50 rounded-lg p-4">
                {isGeneratingSummary && !summary ? (
                  <div className="flex items-center justify-center gap-3 text-orange-900 py-8">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing resource...</span>
                  </div>
                ) : summary ? (
                  <p className="text-gray-800 leading-relaxed">{summary}</p>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Click "Generate Summary" to get an AI-powered overview of this resource.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceDetail;