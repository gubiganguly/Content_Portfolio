import React, { useState } from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const EmailSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate subscription
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      {isSubmitted ? (
        <div className="text-green-400 mb-4">
          Thank you for subscribing! We'll keep you updated.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-grow bg-black/20 border-b border-gray-800 focus:border-gold-400 px-4 py-3 text-white outline-none transition-colors"
          />
          <Button 
            type="submit" 
            variant="outlined"
            disabled={isSubmitting}
            className="md:w-auto"
          >
            {isSubmitting ? 'Subscribing...' : (
              <>
                Subscribe <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default EmailSubscribe;