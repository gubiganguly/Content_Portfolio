import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      {isSubmitted ? (
        <div className="bg-green-900/20 border border-green-500 text-green-300 p-4 mb-8">
          Thank you for your message. We'll be in touch soon.
        </div>
      ) : null}
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-black/20 border-b border-gray-800 focus:border-gold-400 px-4 py-3 text-white outline-none transition-colors"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-black/20 border-b border-gray-800 focus:border-gold-400 px-4 py-3 text-white outline-none transition-colors"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="projectType" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full bg-black/20 border-b border-gray-800 focus:border-gold-400 px-4 py-3 text-white outline-none transition-colors appearance-none"
        >
          <option value="">Select a project type</option>
          <option value="luxury-resort">Luxury Resort</option>
          <option value="real-estate">Real Estate</option>
          <option value="brand-content">Brand Content</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-black/20 border-b border-gray-800 focus:border-gold-400 px-4 py-3 text-white outline-none transition-colors resize-none"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;