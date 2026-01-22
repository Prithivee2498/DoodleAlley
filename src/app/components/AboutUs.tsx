import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import NavSection from './NavSection';

interface AboutUsProps {
  onBack: () => void;
  onNavigate: (view: "catalog" | "about" | "artists") => void;
}

export function AboutUs({onBack, onNavigate }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <NavSection onNavigate={onNavigate} />

      {/* About Us Content */}
      <div className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 border-orange-200 text-[#1E293B] hover:bg-orange-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catelog
        </Button>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-12 mb-12 shadow-lg border border-orange-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100/50 text-[#D97706] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
                ABOUT DOODLE ALLEY
              </div>
              <h1 className="text-5xl font-bold text-[#1E293B] mb-6">
                Handmade <br />
                With <span className="text-[#D97706]">Love</span>
              </h1>
              <p className="text-lg text-[#1E293B]/70 leading-relaxed">
                Discover Handcrafted doodles, Curated crafts, Signature stickers from Doodle Alley.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-orange-100">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-6">Our Story</h2>
            <p className="text-[#1E293B]/70 leading-relaxed mb-4">
              Doodle Alley began as a passion project to celebrate the beauty of handcrafted art and meaningful creativity. We believe every piece tells a story, and every creation carries the warmth of human touch.
            </p>
            <p className="text-[#1E293B]/70 leading-relaxed">
              From intricate mandalas to personalized greeting cards, each artwork is carefully crafted to bring joy and inspiration to your life. We're proud to work with talented artists who pour their hearts into every creation.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-lg border border-orange-100">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-6">Our Mission</h2>
            <p className="text-[#1E293B]/70 leading-relaxed mb-4">
              We're on a mission to make handcrafted art accessible to everyone. In a world of mass production, we celebrate the unique, the personal, and the one-of-a-kind.
            </p>
            <p className="text-[#1E293B]/70 leading-relaxed">
              Every purchase supports independent artists and keeps traditional art forms alive. Together, we're building a community that values creativity, craftsmanship, and authentic expression.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-orange-100">
          <h2 className="text-3xl font-bold text-[#1E293B] mb-8 text-center">Why Choose Doodle Alley?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#D97706" strokeWidth="2"/>
                  <path d="M10 16L14 20L22 12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">100% Handcrafted</h3>
              <p className="text-[#1E293B]/70">Every piece is carefully crafted by hand with attention to detail</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2L20 10L28 12L22 18L24 26L16 22L8 26L10 18L4 12L12 10L16 2Z" stroke="#D97706" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">Unique Designs</h3>
              <p className="text-[#1E293B]/70">Original artwork you won't find anywhere else</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z" stroke="#D97706" strokeWidth="2"/>
                  <path d="M16 10V16L20 20" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">Made to Order</h3>
              <p className="text-[#1E293B]/70">Customized to your preferences and requirements</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-[#1E293B]/70 mb-6">
            Ready to bring some artistic magic into your life?
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onNavigate('catalog')}
              className="bg-[#D97706] text-white hover:bg-[#b45309] shadow-md px-8 py-6 text-lg rounded-full"
            >
              Explore Shop →
            </Button>
            <Button
              onClick={() => onNavigate('artists')}
              variant="outline"
              className="border-orange-200 text-[#1E293B] hover:bg-orange-50 px-8 py-6 text-lg rounded-full"
            >
              Meet Our Artists
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
