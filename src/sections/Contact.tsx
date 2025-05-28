import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <AnimatedSection animation="slide-in-left">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Get In Touch</h2>
            <div className="h-px w-24 bg-gold-400 mb-8"></div>
            <p className="text-gray-300 max-w-lg mb-12">
              Ready to discuss your project? Contact us today to explore how our 
              premium aerial cinematography can elevate your brand or property.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-black/40 p-3 rounded-full mr-4">
                  <MapPin size={20} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-light mb-1">Our Location</h3>
                  <p className="text-gray-400">Los Angeles, California</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black/40 p-3 rounded-full mr-4">
                  <Mail size={20} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-light mb-1">Email Us</h3>
                  <p className="text-gray-400">info@skymotion.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black/40 p-3 rounded-full mr-4">
                  <Phone size={20} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-light mb-1">Call Us</h3>
                  <p className="text-gray-400">+1 (323) 555-0123</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right" delay={200}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;