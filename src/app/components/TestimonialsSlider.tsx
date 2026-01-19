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
    <div className="py-12 px-4" style={{ backgroundColor: '#e6dff7' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center shadow-md transition-all flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center px-4 py-8">
              <p className="text-xl md:text-2xl font-medium mb-4">
                "{testimonials[currentIndex].text}"
              </p>
              <p className="text-gray-600">
                — {testimonials[currentIndex].author}
              </p>
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center shadow-md transition-all flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#7c5db8] w-8'
                    : 'bg-[#c7b8ea]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
