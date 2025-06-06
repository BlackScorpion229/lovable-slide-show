
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    type: 'title',
    title: 'Welcome to Our Company',
    subtitle: 'Innovation • Excellence • Growth',
    background: 'bg-gradient-to-br from-blue-600 to-purple-700'
  },
  {
    id: 2,
    type: 'content',
    title: 'Our Mission',
    content: 'We strive to deliver exceptional solutions that transform businesses and create lasting value for our clients worldwide.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    background: 'bg-gradient-to-br from-slate-50 to-blue-50'
  },
  {
    id: 3,
    type: 'stats',
    title: 'Our Impact',
    stats: [
      { label: 'Happy Clients', value: '500+' },
      { label: 'Projects Completed', value: '1,200+' },
      { label: 'Team Members', value: '150+' },
      { label: 'Countries Served', value: '25+' }
    ],
    background: 'bg-gradient-to-br from-green-600 to-teal-700'
  },
  {
    id: 4,
    type: 'video',
    title: 'See Us In Action',
    subtitle: 'Watch how we bring ideas to life',
    videoUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop',
    background: 'bg-gradient-to-br from-gray-900 to-gray-700'
  },
  {
    id: 5,
    type: 'features',
    title: 'What Sets Us Apart',
    features: [
      { title: 'Innovation', description: 'Cutting-edge solutions for modern challenges' },
      { title: 'Quality', description: 'Uncompromising standards in every project' },
      { title: 'Speed', description: 'Rapid delivery without sacrificing excellence' },
      { title: 'Support', description: '24/7 dedicated customer support' }
    ],
    background: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 6,
    type: 'team',
    title: 'Meet Our Leadership',
    team: [
      { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop' },
      { name: 'Michael Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop' },
      { name: 'Emily Rodriguez', role: 'VP of Operations', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop' }
    ],
    background: 'bg-gradient-to-br from-purple-600 to-pink-600'
  },
  {
    id: 7,
    type: 'process',
    title: 'Our Process',
    steps: [
      { number: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
      { number: '02', title: 'Strategy', description: 'Crafting the perfect solution approach' },
      { number: '03', title: 'Development', description: 'Building with precision and care' },
      { number: '04', title: 'Launch', description: 'Delivering excellence on time' }
    ],
    background: 'bg-gradient-to-br from-indigo-600 to-blue-700'
  },
  {
    id: 8,
    type: 'testimonial',
    title: 'What Our Clients Say',
    quote: '"Working with this team has been transformative for our business. Their attention to detail and innovative approach exceeded all our expectations."',
    author: 'David Thompson',
    role: 'CEO, TechCorp Solutions',
    background: 'bg-gradient-to-br from-emerald-600 to-cyan-600'
  },
  {
    id: 9,
    type: 'gallery',
    title: 'Our Recent Projects',
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop'
    ],
    background: 'bg-gradient-to-br from-violet-600 to-purple-700'
  },
  {
    id: 10,
    type: 'contact',
    title: 'Let\'s Build Something Amazing',
    subtitle: 'Ready to transform your vision into reality?',
    cta: 'Get Started Today',
    background: 'bg-gradient-to-br from-rose-600 to-orange-600'
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const resetSlideshow = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
    setDirection(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
      if (e.key === 'Escape') resetSlideshow();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

  const currentSlideData = slides[currentSlide];

  const renderSlideContent = () => {
    const baseClasses = "w-full h-full flex flex-col justify-center items-center text-white p-8 md:p-16";
    
    switch (currentSlideData.type) {
      case 'title':
        return (
          <div className={`${baseClasses} text-center`}>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in">
              {currentSlideData.title}
            </h1>
            <p className="text-xl md:text-3xl opacity-90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {currentSlideData.subtitle}
            </p>
          </div>
        );

      case 'content':
        return (
          <div className={`${baseClasses} text-gray-800`}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{currentSlideData.title}</h2>
                <p className="text-lg md:text-xl leading-relaxed">{currentSlideData.content}</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <img 
                  src={currentSlideData.image} 
                  alt="Company" 
                  className="w-full h-80 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
              {currentSlideData.stats?.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-3xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm md:text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'video':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentSlideData.subtitle}
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img 
                src={currentSlideData.videoUrl} 
                alt="Video thumbnail" 
                className="w-full max-w-4xl h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {currentSlideData.features?.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 backdrop-blur-sm p-6 rounded-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="opacity-90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
              {currentSlideData.team?.map((member, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/50"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="opacity-90">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'process':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl">
              {currentSlideData.steps?.map((step, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl font-bold mb-4 text-yellow-300">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm opacity-90">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className={`${baseClasses} text-center max-w-4xl mx-auto`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in">
              {currentSlideData.title}
            </h2>
            <blockquote className="text-xl md:text-2xl italic mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentSlideData.quote}
            </blockquote>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="font-bold text-lg">{currentSlideData.author}</p>
              <p className="opacity-90">{currentSlideData.role}</p>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {currentSlideData.images?.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Project ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={`${baseClasses} text-center`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
              {currentSlideData.title}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentSlideData.subtitle}
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-rose-600 hover:bg-gray-100 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              {currentSlideData.cta}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Main slide content */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlideData.background}`}>
        {renderSlideContent()}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={resetSlideshow}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 text-white/80 z-10">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Index;
