import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, MessageSquare, X, Sparkles } from 'lucide-react';
import axios from "axios";
//@ts-ignore
import confetti from 'canvas-confetti';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
  timestamp?: number;
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Format messages with markdown support
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  // Load/Save chat from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: Date.now() 
    }]);
    setIsLoading(true);
    setStreamedResponse('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/gemini', {
        message: userMessage,
      });

      // Typewriter effect for bot response
      const botReply = response.data.reply || 'No response received.';
      let displayedText = '';
      
      for (let i = 0; i < botReply.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10));
        displayedText += botReply[i];
        setStreamedResponse(displayedText);
      }

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: botReply,
        timestamp: Date.now() 
      }]);
      setStreamedResponse('');

      // Trigger confetti for certain responses
      if (botReply.includes('👍') || botReply.includes('Great') || botReply.length > 100) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || 'Oops! Something went wrong.';
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `⚠️ ${errorMsg}`,
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-900 via-red-800 to-red-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange-900  to-red-900 p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">SIRA - Your Library Assistant</h2>
                </div>
                <button 
                  onClick={clearChat}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm opacity-80">Ask me anything about our library!</p>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-center items-center text-center p-4">
                  <Sparkles className="w-8 h-8 text-yelow-400 mb-2" />
                  <h3 className="font-medium text-gray-500">How can I help you today?</h3>
                  <div className="mt-4 space-y-2 w-full">
                    {[
                      "Suggest some horror books?",
                      "Summarize deep learning?",
                      "Recommend a mystery novel"
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt)}
                        className="w-full p-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {message.role === 'bot' && (
                      <div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-blue-100">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-3xl max-w-[85%] relative ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900 text-white rounded-br-none'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} 
                        className="prose prose-sm"
                      />
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="flex items-start gap-2"
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-blue-100">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="p-4 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 max-w-[85%]">
                      {streamedResponse ? (
                        <div dangerouslySetInnerHTML={{ __html: formatMessage(streamedResponse) }} />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white border-t"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white p-3 rounded-xl disabled:opacity-50 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;