
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TestimonialSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Legal Counsel",
      company: "Tech Innovations Inc.",
      quote: "LegaLens has completely transformed how our legal team reviews contracts. What used to take hours now takes minutes, with even better insights.",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Thompson",
      role: "Small Business Owner",
      company: "Thompson Consulting",
      quote: "As someone without legal expertise, LegaLens has been invaluable. I can understand exactly what I'm signing and avoid potential pitfalls.",
      avatar: "https://i.pravatar.cc/150?img=4",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Startup Founder",
      company: "NextGen Solutions",
      quote: "The risk identification feature saved us from a terrible contract clause that would have cost us thousands. Worth every penny!",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-navy">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how LegaLens is helping professionals and businesses simplify legal document analysis.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="glass-card p-8 md:p-10">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-legal-light-blue">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToPrevious}
                className="rounded-full"
              >
                <ChevronLeft size={20} />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-legal-light-blue scale-125' : 'bg-gray-300'}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToNext}
                className="rounded-full"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
