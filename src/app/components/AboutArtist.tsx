import { ArrowLeft, Instagram, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import NavSection from './NavSection';

interface OurMakersProps {
  onBack: () => void;
  onNavigate: (view: 'catalog' | 'about'|'artists') => void;
}

const artists = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Lead Artist & Founder',
    specialty: 'Mandala Art & Digital Illustrations',
    bio: 'Priya is the creative force behind Doodle Alley. With over 8 years of experience in traditional and digital art, she specializes in intricate mandala designs and personalized illustrations that capture special moments.',
    imageUrl: 'https://images.unsplash.com/photo-1600783486675-b0690b0967ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTAyODgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    instagram: '@priyaart',
    email: 'priya@doodlealley.com',
  },
  // {
  //   id: '2',
  //   name: 'Rahul Mehta',
  //   role: 'Stipple Art Specialist',
  //   specialty: 'Pointillism & Detailed Portraits',
  //   bio: 'Rahul brings patience and precision to every piece. His stipple art technique creates stunning portraits and landscapes using thousands of tiny dots, each placed with care and intention.',
  //   imageUrl: 'https://images.unsplash.com/photo-1604227070389-b88fd2896af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwYWludGluZyUyMHN0dWRpb3xlbnwxfHx8fDE3NjkwMzY0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  //   instagram: '@rahulstipples',
  //   email: 'rahul@doodlealley.com',
  // },
  // {
  //   id: '3',
  //   name: 'Ananya Patel',
  //   role: 'Greeting Card Designer',
  //   specialty: 'Hand-lettering & Watercolor',
  //   bio: 'Ananya creates heartwarming greeting cards that speak from the soul. Her combination of hand-lettering and delicate watercolors makes each card a treasured keepsake.',
  //   imageUrl: 'https://images.unsplash.com/photo-1693159682618-074078ed271e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2t8ZW58MXx8fHwxNzY5MDMxMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  //   instagram: '@ananyacards',
  //   email: 'ananya@doodlealley.com',
  // },
];

export function OurMakers({ onBack, onNavigate }: OurMakersProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <NavSection onNavigate={onNavigate}/>

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
            Every piece you see is crafted by talented artists who pour their hearts into their work. 
            Get to know the makers behind the magic.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="space-y-12">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-100 ${
                index % 2 === 0 ? '' : ''
              }`}
            >
              <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? '' : 'md:grid-flow-dense'}`}>
                {/* Image */}
                <div className={`${index % 2 === 0 ? '' : 'md:col-start-2'}`}>
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`p-10 flex flex-col justify-center ${index % 2 === 0 ? '' : 'md:col-start-1 md:row-start-1'}`}>
                  <div className="mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100/50 text-[#D97706]">
                      {artist.role}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-[#1E293B] mb-3">{artist.name}</h2>
                  <p className="text-lg font-semibold text-[#D97706] mb-6">{artist.specialty}</p>
                  <p className="text-[#1E293B]/70 leading-relaxed mb-8">{artist.bio}</p>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <a
                      href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-[#D97706] hover:bg-orange-100 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-medium">{artist.instagram}</span>
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
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">Want to Join Our Team?</h2>
          <p className="text-[#1E293B]/70 mb-8 max-w-2xl mx-auto">
            We're always looking for talented artists to join the Doodle Alley family. 
            If you're passionate about handcrafted art, we'd love to hear from you!
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onNavigate('catalog')}
              className="bg-[#D97706] text-white hover:bg-[#b45309] shadow-md px-8 py-6 text-lg rounded-full"
            >
              Explore Our Work →
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 text-[#1E293B] hover:bg-orange-50 px-8 py-6 text-lg rounded-full"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
