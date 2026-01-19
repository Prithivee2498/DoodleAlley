import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: 'Super cute and perfect quality 😍',
    author: 'Sarah M.',
  },
  {
    id: 2,
    text: 'Delivered on time ✅',
    author: 'Mike R.',
  },
  {
    id: 3,
    text: 'Absolutely love my custom doodle! 💜',
    author: 'Emma L.',
  },
  {
    id: 4,
    text: 'Amazing artwork and attention to detail ✨',
    author: 'James K.',
  },
  {
    id: 5,
    text: 'Best purchase ever! Highly recommend 🌟',
    author: 'Olivia T.',
  },
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

return (
  <div className="py-12 px-4" style={{ backgroundColor: '#FFFDF9' }}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#2C3E50' }}>
        What Our Customers Say
      </h2>
      
      <div className="relative">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full"
            style={{
              backgroundColor: '#FFDAB9',
              color: '#2C3E50',
              boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
              transition: 'background 0.2s',
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: '#2C3E50' }} />
          </button>

          <div className="flex-1 text-center px-4 py-8">
            <p className="text-xl md:text-2xl font-medium mb-4" style={{ color: '#2C3E50' }}>
              "{testimonials[currentIndex].text}"
            </p>
            <p style={{ color: '#2C3E50' }}>
              — {testimonials[currentIndex].author}
            </p>
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full"
            style={{
              backgroundColor: '#FFDAB9',
              color: '#2C3E50',
              boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
              transition: 'background 0.2s',
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: '#2C3E50' }} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="rounded-full transition-all"
              style={{
                width: index === currentIndex ? 32 : 8,
                height: 8,
                backgroundColor: index === currentIndex ? '#FFDAB9' : '#c7b8ea',
                border: index === currentIndex ? '2px solid #2C3E50' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

}
