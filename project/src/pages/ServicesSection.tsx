import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';

const ServicesSection = () => {
    const staggerContainer = {
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      };
      const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
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
        Our Services
      </motion.h2>
      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {[
          { icon: BookOpen, title: "Book Lending", color: "red", description: "Borrow physical and digital books with flexible lending periods." },
          { icon: GraduationCap, title: "Research Support", color: "yellow", description: "Get assistance with academic research and paper writing." }
        ].map((service, index) => (
          <motion.div 
            key={index}
            className="flex items-start space-x-4"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`w-12 h-12 bg-${service.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
              <service.icon className={`w-6 h-6 text-${service.color}-600`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section></div>
  )
}

export default ServicesSection