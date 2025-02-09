"use client"
import React from 'react';

const BusinessStagesOverview = () => {
  const stages = [
    {
      id: 1,
      title: "Startup Stage (0-1 year)",
      challenges: [
        "Low brand awareness",
        "Limited budget for advertising",
        "Lack of social media knowledge",
        "Struggling to attract first customers"
      ]
    },
    {
      id: 2,
      title: "Growth Stage (1-3 years)",
      challenges: [
        "Gaining trust and credibility",
        "Struggling with engagement & conversions",
        "Managing multiple platforms effectively",
        "Limited understanding of paid ads"
      ]
    },
    {
      id: 3,
      title: "Established Stage (3-5 years)",
      challenges: [
        "Need for rebranding & higher engagement",
        "Expanding customer base beyond local market",
        "Standing out against larger competitors",
        "Keeping content fresh & consistent"
      ]
    },
    {
      id: 4,
      title: "Scaling Stage (5+ years)",
      challenges: [
        "Expanding beyond social media",
        "Managing customer service at scale",
        "Need for data-driven marketing decisions"
      ]
    }
  ];

  const currentStage = 2;

  return (
    <div className="min-h-screen bg-[#F5F5DC] font-['Lora']">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
          Your Business Journey: Discover Your Stage
        </h1>
        
        {/* Current Stage Indicator */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-lg">
            Your Current Stage: {currentStage}
          </span>
        </div>

        {/* All Stages */}
        <div className="space-y-8">
          {stages.map((stage) => (
            <div 
              key={stage.id}
              className={`bg-white rounded-lg shadow-md p-8 transition-all
                ${stage.id === currentStage ? 'ring-2 ring-blue-600 transform scale-102' : ''}`}
            >
              <h2 className={`text-2xl font-bold mb-6 flex items-center
                ${stage.id === currentStage ? 'text-blue-600' : 'text-black'}`}
              >
                {stage.id === currentStage && (
                  <span className="mr-2 text-blue-600">►</span>
                )}
                {stage.title}
              </h2>

              <div>
                <h3 className="text-xl font-semibold text-black mb-4">
                  Common Challenges:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {stage.challenges.map((challenge, index) => (
                    <li key={index} className="text-black">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessStagesOverview;