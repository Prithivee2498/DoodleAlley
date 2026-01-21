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
    <div className="py-16 px-4 bg-gradient-to-br from-orange-50 to-orange-100/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1E293B]">
          What Our Customers Say
        </h2>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center shadow-lg transition-all flex-shrink-0 text-[#1E293B] hover:scale-110 border border-orange-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center px-4 py-10 bg-white rounded-3xl shadow-md border border-orange-100">
              <p className="text-xl md:text-2xl font-medium mb-4 text-[#1E293B]">
                "{testimonials[currentIndex].text}"
              </p>
              <p className="text-[#D97706] font-semibold">
                — {testimonials[currentIndex].author}
              </p>
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center shadow-lg transition-all flex-shrink-0 text-[#1E293B] hover:scale-110 border border-orange-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#D97706] w-8 shadow-sm'
                    : 'bg-orange-200 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}