import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
const Footer = () => {
  return (
    <div>
        <footer className="bg-white text-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "About", links: ["Our Story", "Team", "Careers"] },
              { title: "Resources", links: ["Blog", "Help Center", "Guidelines"] },
              { title: "Contact", links: ["Support", "Contact Us", "FAQ"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
            ].map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a 
                        href="#" 
                        className="hover:text-white transition"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div> */}
          <motion.div 
            className="border-t border-gray-700 mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 Library. All rights reserved to Rahul Aryan Tiwari.</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm">
              <Github className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">GitHub:</span>
              <a 
                href="https://github.com/Aryan1711-rookie" 
                className="text-yellow-600 hover:text-yellow-800 underline transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Aryan1711-rookie
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default Footer