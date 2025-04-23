import { motion } from 'framer-motion';
import { Book, Bot, Clock} from 'lucide-react';
const Features = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      };
    const staggerContainer = {
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      };
  return (
    <div><section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Why Choose Our Library
      </motion.h2>
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {[
          { icon: Book, title: "Vast Collection", color: "blue", description: "Access to over 100,000 books across all genres and academic fields." },
          { icon: Clock, title: "24/7 Access", color: "green", description: "Online resources available around the clock from anywhere in the world." },
          { icon: Bot, title: "AI Support", color: "purple", description: "Efficiently summarizes PDF documents using advanced AI algorithms, providing concise overviews in seconds." }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}>
              <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
</div>
  )
}

export default Features