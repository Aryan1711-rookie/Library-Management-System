import HeroSection from './pages/HeroSection';
import Features from './pages/Features';
import Search from './pages/Search';
import ServicesSection from './pages/ServicesSection';
import Cta from './pages/Cta';
import Footer from './component/Footer';
import ChatBot from "./component/ChatBot";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <Features />
      
      {/* Search Section */}
      <Search />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* CTA Section */}
      <Cta />
      
      {/* Footer */}
      <Footer />
      
      {/* ChatBot Floating in Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default Home;
