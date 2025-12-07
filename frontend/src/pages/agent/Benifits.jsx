import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, BookOpen, Briefcase, Heart, Globe, Award } from 'lucide-react';

const BenefitsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cards = [
    {
      id: 1,
      icon: <BookOpen className="w-16 h-16 text-blue-600" />,
      title: "Empowering Education, Shaping Futures",
      description: "Dashapta Seva Trust empowers students through scholarships and Olympiad exams, helping them rise and lead. We're here to support every dream and build a brighter future.",
      image: "/images/empower.png"
    },
    {
      id: 2,
      icon: <Users className="w-16 h-16 text-green-600" />,
      title: "Transparency. Trust. Transformation",
      description: "Dashapta Seva Trust is a registered non-profit committed to real, measurable community impact. Every effort and partnership helps us turn purpose into action and lives into success stories.",
      image: "/images/transperancy.png"
    },
    {
      id: 3,
      icon: <Briefcase className="w-16 h-16 text-purple-600" />,
      title: "Creating Jobs, Building Lives",
      description: "Dashapta Seva Trust empowers youth, women, and underserved communities with skill training and job opportunities. We turn unemployment into confidence, dignity, and self-reliance.",
      image: "/images/createjob.png"
    },
    {
      id: 4,
      icon: <Heart className="w-16 h-16 text-red-600" />,
      title: "Health & Accidental Insurance",
      description: "Protecting lives with coverage that supports medical needs and emergencies. Ensuring peace of mind for individuals and families in times of crisis.",
      image: "/images/health.png"
    },
    {
      id: 5,
      icon: <Globe className="w-16 h-16 text-teal-600" />,
      title: "Be a Part of Something Bigger",
      description: "Whether you're an individual or an organization, your support can change lives. Together, we can create a world where every student is uplifted and every dream is possible.",
      image: "/images/bepart.png"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, cards.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-2 sm:px-4" style={{backgroundColor: 'rgba(243, 243, 243, 1)'}}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
          Benefits
        </h1>
        
        <div className="relative overflow-hidden">
          {/* Mobile Layout - Single Card */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
              <div className="w-full max-w-sm mx-auto">
                <div 
                  className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 hover:shadow-3xl transition-all duration-300"
                  style={{
                    borderTop: '4px solid rgba(137,12,37,1)',
                    borderBottom: '4px solid rgba(137,12,37,1)',
                    borderLeft: '4px solid rgba(137,12,37,1)',
                    borderRight: '4px solid rgba(137,12,37,1)',
                    boxSizing: 'border-box'
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={cards[currentIndex].image} 
                      alt={cards[currentIndex].title}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                      {cards[currentIndex].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {cards[currentIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 Card Layout */}
          <div className="hidden lg:flex items-center justify-center min-h-[600px] gap-4 xl:gap-8">
            {/* Previous card (faded) */}
            <div className="w-64 xl:w-80 h-[400px] xl:h-[450px] opacity-40 transform scale-90 transition-all duration-500">
              <div className="bg-white rounded-2xl shadow-lg p-4 xl:p-6 h-full border border-gray-200">
                <div className="flex flex-col items-center text-center h-full">
                  <img 
                    src={cards[(currentIndex - 1 + cards.length) % cards.length].image} 
                    alt={cards[(currentIndex - 1 + cards.length) % cards.length].title}
                    className="w-full h-32 xl:h-44 object-cover rounded-lg mb-3 xl:mb-4"
                  />
                  <h3 className="text-base xl:text-lg font-semibold text-gray-700 mb-2 xl:mb-3">
                    {cards[(currentIndex - 1 + cards.length) % cards.length].title}
                  </h3>
                  <p className="text-gray-500 text-xs xl:text-sm leading-relaxed">
                    {cards[(currentIndex - 1 + cards.length) % cards.length].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Current card (highlighted center) */}
            <div className="w-80 xl:w-96 h-[450px] xl:h-[500px] relative z-10 transform scale-105 transition-all duration-500">
              <div 
                className="bg-white rounded-2xl shadow-2xl p-6 xl:p-8 h-full hover:shadow-3xl transition-all duration-300"
                style={{
                  borderTop: '4px solid rgba(137,12,37,1)',
                  borderBottom: '4px solid rgba(137,12,37,1)',
                  borderLeft: '4px solid rgba(137,12,37,1)',
                  borderRight: '4px solid rgba(137,12,37,1)',
                  boxSizing: 'border-box'
                }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <img 
                    src={cards[currentIndex].image} 
                    alt={cards[currentIndex].title}
                    className="w-full h-44 xl:h-52 object-cover rounded-lg mb-4 xl:mb-6"
                  />
                  <h3 className="text-xl xl:text-2xl font-bold text-gray-800 mb-3 xl:mb-4">
                    {cards[currentIndex].title}
                  </h3>
                  <p className="text-sm xl:text-base text-gray-600 leading-relaxed">
                    {cards[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Next card (faded) */}
            <div className="w-64 xl:w-80 h-[400px] xl:h-[450px] opacity-40 transform scale-90 transition-all duration-500">
              <div className="bg-white rounded-2xl shadow-lg p-4 xl:p-6 h-full border border-gray-200">
                <div className="flex flex-col items-center text-center h-full">
                  <img 
                    src={cards[(currentIndex + 1) % cards.length].image} 
                    alt={cards[(currentIndex + 1) % cards.length].title}
                    className="w-full h-32 xl:h-44 object-cover rounded-lg mb-3 xl:mb-4"
                  />
                  <h3 className="text-base xl:text-lg font-semibold text-gray-700 mb-2 xl:mb-3">
                    {cards[(currentIndex + 1) % cards.length].title}
                  </h3>
                  <p className="text-gray-500 text-xs xl:text-sm leading-relaxed">
                    {cards[(currentIndex + 1) % cards.length].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-20 hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-20 hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12 space-x-2 sm:space-x-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              style={{
                backgroundColor: index === currentIndex ? 'rgba(137,12,37,1)' : undefined
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsCarousel;