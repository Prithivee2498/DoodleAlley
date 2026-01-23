import { ArrowLeft, Instagram, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import NavSection from "./NavSection";

interface OurMakersProps {
  onBack: () => void;
  onNavigate: (view: "catalog" | "about" | "artists") => void;
}

const artists = [
  {
    id: "1",
    name: "Hamsa M R",
    role: "Lead Artist & Founder",
    specialty: "Architect & Artist",
    bio: "At the heart of Doodle Alley is Hamsa M R—a qualified architect and a passionate artist who chose to follow her creative calling.With a simple dream of building an art-focused brand and the courage to believe in her vision, Hamsa began this journey with just one sale. What followed was not overnight success, but consistency, resilience, and an unwavering love for art. Today, Doodle Alley stands as a growing creative venture powered by passion rather than shortcuts.Her vision goes beyond personal success. She dreams of bringing art into the mainstream, making it accessible, valued, and celebrated—while also creating opportunities for artists with hidden talent. Doodle Alley aims to become a platform where creativity finds recognition and artists find employment, confidence, and purpose.“When passion meets patience, art turns into a legacy.”Through Doodle Alley, Hamsa continues to create, inspire, and build—one artwork, one story, and one dream at a time..",
    imageUrl:
      "https://images.unsplash.com/photo-1600783486675-b0690b0967ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTAyODgxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    instagram: "@doodle.alley",
    email: "hamsamrdesign@gmail.com",
  },
];

export function OurMakers({ onBack, onNavigate }: OurMakersProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <NavSection onNavigate={onNavigate} showSearch={false} />

      {/* Our Makers Content */}
      <div className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 border-orange-200 text-[#1E293B] hover:bg-orange-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100/50 text-[#D97706] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
            MEET THE ARTISTS
          </div>
          <h1 className="text-5xl font-bold text-[#1E293B] mb-6">
            The Creative Minds Behind <br />
            <span className="text-[#D97706]">Doodle Alley</span>
          </h1>
          <p className="text-lg text-[#1E293B]/70 max-w-2xl mx-auto">
            Every piece you see is crafted by talented artists who pour their
            hearts into their work. Get to know the makers behind the magic.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="space-y-12">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-100 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div
                className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "md:grid-flow-dense"}`}
              >
                {/* Image */}
                <div className={`${index % 2 === 0 ? "" : "md:col-start-2"}`}>
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left ${
                    index % 2 === 0 ? "" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <div className="mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100/50 text-[#D97706]">
                      {artist.role}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-[#1E293B] mb-3">
                    {artist.name}
                  </h2>
                  <p className="text-lg font-semibold text-[#D97706] mb-6">
                    {artist.specialty}
                  </p>
                  <p className="text-[#1E293B]/70 leading-relaxed mb-8">
                    {artist.bio}
                  </p>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <a
                      href={`https://instagram.com/${artist.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-[#D97706] hover:bg-orange-100 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {artist.instagram}
                      </span>
                    </a>
                    <a
                      href={`mailto:${artist.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-[#D97706] hover:bg-orange-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-3xl p-12 text-center border border-orange-100">
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-[#1E293B]/70 mb-8 max-w-2xl mx-auto">
            We're always looking for talented artists to join the Doodle Alley
            family. If you're passionate about handcrafted art, we'd love to
            hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => onNavigate("catalog")}
              className="w-full sm:w-auto border-orange-200 text-[#1E293B] hover:bg-orange-50 px-8 py-6 text-lg rounded-full"
            >
              Explore Our Work →
            </Button>
            <a href={"https://instagram.com/doodle.alley"} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-orange-200 text-[#1E293B] hover:bg-orange-50 px-8 py-6 text-lg rounded-full"
            >
              Get in Touch
            </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
