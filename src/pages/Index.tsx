import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    type: 'title',
    title: 'Welcome to DZ Analytics',
    subtitle: 'Data • AI • Innovation',
    background: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 2,
    type: 'services',
    title: 'What We Do?',
    services: [
      {
        number: '1',
        title: 'Redesign the world through data & AI Innovation',
        color: 'bg-orange-400',
        technologies: ['Machine Learning', 'AWS', 'Python', 'PySpark', 'Data Engineering', 'TensorFlow', 'Jupyter', 'SQL']
      },
      {
        number: '2', 
        title: 'SAP Development & Integration',
        color: 'bg-orange-500',
        technologies: ['SAP PI/PO/CPI', 'SAP SD', 'SAP FICO']
      },
      {
        number: '3',
        title: 'IT Staff Augmentation',
        color: 'bg-red-600',
        services: ['Talent Pool Provision', 'Recruitment and Vetting', 'Cost Management', 'Risk Mitigation']
      }
    ],
    background: 'bg-gradient-to-br from-orange-400 to-red-700'
  },
  {
    id: 3,
    type: 'data-ai',
    title: 'Data & AI Excellence',
    categories: [
      {
        title: 'Data Engineering Excellence',
        color: 'bg-orange-400',
        items: ['Cloud Engineering', 'Master Data Management', 'Modern Data Platform', 'Data Operations & Governance', 'Data as a Service', 'ML Ops']
      },
      {
        title: 'Gen AI & AI Innovation',
        color: 'bg-orange-500',
        items: ['Build a Secure, AI-Driven Digital Foundation', 'Business Solutions & Insights', 'Empowering Enterprises with Advanced LLM Tools, Agent Programs & Prompt Engineering']
      },
      {
        title: 'Data Science Consulting',
        color: 'bg-red-600',
        items: ['Data Diagnostics', 'Predictive Modeling', 'AI/ML', 'Optimization Systems', 'Statistical Modeling', 'Decision Cultural Transformation', 'Enterprise data Management', 'Dashboards/Reporting']
      },
      {
        title: 'AI Talent',
        color: 'bg-red-800',
        items: ['Structured On Job Training (OJT)', 'Mentorship and Coaching Programs', 'Continuous learning opportunities', 'Individual development plans', 'Ensure teams have access to the latest tools and technologies']
      }
    ],
    background: 'bg-gradient-to-br from-orange-400 to-red-800'
  },
  {
    id: 4,
    type: 'projects-grid',
    title: 'Key Projects on Data',
    projectCategories: [
      {
        title: 'Customer Analytics',
        projects: ['Collections Engine', 'Credit Risk Optimizer', 'Bad Debt Model', 'Overdue Forecasting', 'Customer Churn']
      },
      {
        title: 'Logistics & Supply Chain',
        projects: ['In Transit Predictions', 'Stock Balancing', 'On Time Delivery Analytics', 'Fleet Optimization', 'Inventory Deployment Optimization']
      },
      {
        title: 'Healthcare',
        projects: ['Disease Prediction', 'Cost Optimization in supply chain', 'Claims Processing Automation']
      },
      {
        title: 'Manufacturing',
        projects: ['Predictive Maintenance', 'Defect Detection(CNN)', 'Demand Forecasting', 'Energy Consumption optimization']
      },
      {
        title: 'Finance',
        projects: ['Fraud Detection & prevention', 'Credit Scoring & Risk Assessment', 'Customer Segmentation']
      },
      {
        title: 'E-Commerce',
        projects: ['Recommendation Systems', 'Dynamic Price Optimization', 'Sentiment Analysis', 'Personalized Email Campaign']
      },
      {
        title: 'Human Resources',
        projects: ['Resume Screening & Shortlisting', 'HR Chat Bots', 'Attrition Prediction']
      },
      {
        title: 'Legal and Compliance',
        projects: ['Law GPT', 'Legal Document Summarization']
      }
    ],
    background: 'bg-gradient-to-br from-orange-500 to-red-700'
  },
  {
    id: 5,
    type: 'engineering-projects',
    title: 'Data Engineering Projects',
    engineeringProjects: [
      {
        title: 'Hadoop to Azure',
        description: 'Migration from traditional Hadoop infrastructure to modern Azure cloud services',
        image: '/lovable-uploads/d25eb646-b55e-4a0b-8f35-eefddcfe67cf.png'
      },
      {
        title: 'Data Provider to Salesforce',
        description: 'Integration pipeline connecting external data providers with Salesforce CRM',
        image: '/lovable-uploads/d25eb646-b55e-4a0b-8f35-eefddcfe67cf.png'
      },
      {
        title: 'Real Time Analytics',
        description: 'Stream processing and real-time data analytics platform',
        image: '/lovable-uploads/d25eb646-b55e-4a0b-8f35-eefddcfe67cf.png'
      },
      {
        title: 'Enterprise Data Lake',
        description: 'Scalable data lake architecture for enterprise-wide analytics',
        image: '/lovable-uploads/d25eb646-b55e-4a0b-8f35-eefddcfe67cf.png'
      }
    ],
    background: 'bg-gradient-to-br from-orange-600 to-red-800'
  },
  {
    id: 6,
    type: 'partners',
    title: 'Our Partners',
    partnerLogos: [
      { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=100&fit=crop' },
      { name: 'SAP', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop' },
      { name: 'Amazon AWS', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop' },
      { name: 'Google Cloud', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop' },
      { name: 'Snowflake', logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop' },
      { name: 'Databricks', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=100&fit=crop' }
    ],
    background: 'bg-gradient-to-br from-orange-400 to-red-600'
  },
  {
    id: 7,
    type: 'team',
    title: 'Our Cherished Minds',
    teamImage: '/lovable-uploads/e448b2b0-a6c5-43cb-9c22-7c3751af7c9c.png',
    subtitle: 'Meet our talented team of data scientists, engineers, and AI specialists',
    background: 'bg-gradient-to-br from-orange-500 to-red-700'
  },
  {
    id: 8,
    type: 'process',
    title: 'Our Process',
    steps: [
      { number: '01', title: 'Discovery', description: 'Understanding your data challenges and business goals' },
      { number: '02', title: 'Strategy', description: 'Designing the optimal data architecture and AI strategy' },
      { number: '03', title: 'Implementation', description: 'Building robust data pipelines and AI solutions' },
      { number: '04', title: 'Optimization', description: 'Continuous monitoring and performance enhancement' }
    ],
    background: 'bg-gradient-to-br from-orange-600 to-red-800'
  },
  {
    id: 9,
    type: 'testimonial',
    title: 'Client Success Stories',
    quote: '"DZ Analytics transformed our data infrastructure and helped us achieve 40% improvement in operational efficiency through their innovative AI solutions."',
    author: 'Sarah Johnson',
    role: 'CTO, Tech Innovation Corp',
    background: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 10,
    type: 'contact',
    title: 'Ready to Transform Your Data?',
    subtitle: 'Let\'s discuss how we can help you unlock the power of your data',
    cta: 'Start Your Data Journey',
    background: 'bg-gradient-to-br from-orange-600 to-red-700'
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

      case 'services':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
              {currentSlideData.services?.map((service, index) => (
                <div 
                  key={index}
                  className={`${service.color} p-8 rounded-lg shadow-2xl min-w-80 max-w-sm animate-slide-in-left relative`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="absolute -top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-600">
                    {service.number}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-4 text-center">{service.title}</h3>
                  {service.technologies && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {service.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-white/20 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {service.services && (
                    <ul className="space-y-2 text-sm">
                      {service.services.map((item, itemIndex) => (
                        <li key={itemIndex} className="opacity-90">• {item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'data-ai':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
              {currentSlideData.categories?.map((category, index) => (
                <div 
                  key={index}
                  className={`${category.color} p-6 rounded-lg shadow-2xl animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-lg font-bold mb-4 text-center">{category.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="opacity-90">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects-grid':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
              {currentSlideData.projectCategories?.map((category, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-bold mb-4 text-center text-orange-200 underline">
                    {category.title}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {category.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="text-red-200">• {project}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'engineering-projects':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
              {currentSlideData.engineeringProjects?.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center">{project.title}</h3>
                  <p className="text-sm opacity-90 text-center">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'partners':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl">
              {currentSlideData.partnerLogos?.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-fade-in hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className={baseClasses}>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center animate-fade-in">
              {currentSlideData.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentSlideData.subtitle}
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img 
                src={currentSlideData.teamImage} 
                alt="Our Team"
                className="w-full max-w-4xl h-96 object-cover rounded-lg shadow-2xl"
              />
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
