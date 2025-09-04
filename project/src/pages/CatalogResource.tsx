import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Book,
  User,
  FileText,
  Loader2,
  ArrowLeft,
  Maximize2,
  X,
  GraduationCap,
  Youtube,
} from "lucide-react";

type ResourceType = "books" | "research" | "videos" | "magazines";

interface Resource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  category: string;
  language: "Hindi" | "English" | "Sanskrit";
  available: boolean;
  coverUrl?: string;
  fileUrl?: string;
}

function CatalogResource() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(
          `https://library-management-system-l5gr.onrender.com/api/v1/catalog/${id}`
        );
        if (res.data?.data) {
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
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleResourceView = () => {
    if (!resource) return;
    if (resource.type === "videos") window.open(resource.fileUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 text-orange-900"
        >
          <Loader2 className="animate-spin h-5 w-5" />
          <p className="text-lg font-medium">Loading resource...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 text-center"
        >
          <FileText className="text-red-500 h-12 w-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link
            to="/browse-catalog"
            className="mt-6 inline-flex gap-2 items-center text-orange-900 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 text-center"
        >
          <FileText className="text-gray-400 h-12 w-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">Not Found</h2>
          <p className="text-gray-500">
            The requested resource could not be found.
          </p>
          <Link
            to="/browse-catalog"
            className="mt-6 inline-flex gap-2 items-center text-orange-900 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-8">
      {isFullscreen &&
      ["books", "research", "magazines"].includes(resource.type) ? (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
          >
            <X className="h-5 w-5" />
          </button>
          <iframe
            src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full"
            title="Fullscreen Resource"
          />
        </div>
      ) : (
        <div className="max-w-7xl w-full">
          <Link
            to="/browse-catalog"
            className="inline-flex gap-2 items-center text-orange-900 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-900 via-red-800 to-red-900 p-6 text-white relative">
              <div className="absolute top-4 right-4">
                {resource.type === "videos" ? (
                  <button
                    onClick={handleResourceView}
                    className="p-2 bg-yellow-400 hover:bg-yellow-300 text-orange-900 rounded-full"
                  >
                    <Youtube className="h-5 w-5" />

                  </button>
                ) : (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-yellow-400 hover:bg-yellow-300 text-orange-900 rounded-full"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                )}
                

              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {resource.title}
              </h1>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-around text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-yellow-300" />
                  <span>{resource.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-yellow-300" />
                  <span>{resource.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-yellow-300" />
                  <span className="capitalize">{resource.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-yellow-300" />
                  <span>{resource.language}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {resource.type === "videos" ? (
                <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mx-auto">
                  
                  <div className="mt-4 text-center">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 my-12 bg-red-700 text-white rounded-lg hover:bg-red-500 transition-colors"
                    >
                      <Youtube className="h-[15vh] w-[15vh]" />
                      Watch on YouTube
                    </motion.a>
                  </div>
                </div>
              ) : ["books", "research", "magazines"].includes(resource.type) ? (
                <div className="h-[70vh]">
                  <iframe
                    src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-none"
                    title="Resource View"
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No preview available for this resource</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CatalogResource;
