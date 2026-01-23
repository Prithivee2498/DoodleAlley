import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import NavSection from "./NavSection";
import myImage from "../../assets/aboutpageimg.jpg";

interface AboutUsProps {
  onBack: () => void;
  onNavigate: (view: "catalog" | "about" | "artists") => void;
}

export function AboutUs({ onBack, onNavigate }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <NavSection onNavigate={onNavigate} showSearch={false} />

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
        {/* HERO */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-10 shadow-lg border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100/50 text-[#D97706] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
                ABOUT DOODLE ALLEY
              </div>

              <h1 className="text-5xl font-bold text-[#1E293B] mb-6 leading-tight">
                Handmade <br />
                With <span className="text-[#D97706]">Love</span>
              </h1>

              <p className="text-lg text-[#1E293B]/70 leading-relaxed mb-6">
                Discover handcrafted doodles, curated crafts, and signature
                stickers from Doodle Alley.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => onNavigate("catalog")}
                  className="bg-[#D97706] text-white hover:bg-[#b45309] rounded-full px-6"
                >
                  Explore Shop →
                </Button>

                <Button
                  onClick={() => onNavigate("artists")}
                  variant="outline"
                  className="border-orange-200 text-[#1E293B] hover:bg-orange-50 rounded-full px-6"
                >
                  Meet Our Artists
                </Button>
              </div>
            </div>

            <div className="w-full flex justify-center md:justify-end">
              <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-md border border-orange-100">
                <img
                  src={myImage}
                  alt="Doodle Alley"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STORY - compact + expandable */}
        <div className="bg-white rounded-3xl p-8 md:p-10 mb-10 shadow-lg border border-orange-100">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-orange-100/50 text-[#D97706] px-4 py-2 rounded-full text-sm font-semibold w-fit">
              <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
              OUR STORY
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
              <span className="text-[#D97706]">Art</span> is not what you see,
              <br className="hidden md:block" /> but what you make others feel.
            </h2>

            <p className="text-[#1E293B]/70 leading-relaxed">
              Doodle Alley began in 2019 with a simple yet powerful belief—that
              art is not just something you see, but something you feel.
            </p>

            {/* Expandable long text */}
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-[#D97706] hover:opacity-80">
                Read full story
              </summary>
              <div className="mt-4 space-y-4 text-[#1E293B]/70 leading-relaxed">
                <p>
                  Founded by an architect-artist, the brand was born from a love
                  for detail, design, and emotional storytelling. What started
                  with handcrafted stipple portrait art soon grew into a
                  thoughtfully curated art studio.
                </p>
                <p>
                  Each product is a reflection of our belief that art should
                  speak your story—whether it celebrates love, memories,
                  milestones, or everyday beauty. Doodle Alley stands for
                  originality, handcrafted excellence, and the joy of gifting
                  something truly meaningful.
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* OFFERINGS + MISSION */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Offerings */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-orange-100">
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
              Our Offerings
            </h3>
            <br />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[#1E293B]/70">
              {[
                "Stipple Portrait Art",
                "Mandala Art",
                "Lippen Art",
                "Calendars",
                "Hand Casting",
                "Wall Hangings",
                "House Name Boards",
                "Gift Hampers",
                "Polaroid Stands",
                "Digital Art",
                "Book Markers",
                "Pencil Shade"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#D97706]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-orange-100">
            <h3 className="text-2xl font-bold text-[#1E293B] mb-6">
              Our Mission
            </h3>

            <div className="space-y-4 text-[#1E293B]/70 leading-relaxed">
              <p>
                Our mission is to bring art into everyday life and elevate it
                into meaningful experiences—art that connects deeply, celebrates
                individuality, and leaves a lasting impression.
              </p>
              <p>
                Beyond creation, we’re committed to nurturing
                creativity—supporting emerging artists, uncovering hidden
                talent, and creating opportunities to grow with purpose.
              </p>
              <p>
                Through thoughtful craftsmanship and soulful design, we aim to
                make art accessible, valued, and truly felt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
