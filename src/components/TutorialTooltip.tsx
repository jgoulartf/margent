import React, { useEffect, useState } from 'react';
import { useTutorial } from '../context/TutorialContext';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const TutorialTooltip: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, endTutorial } = useTutorial();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive || !steps[currentStep]) {
      setIsVisible(false);
      return;
    }

    const targetElement = document.querySelector(`[data-tutorial="${steps[currentStep].target}"]`);
    if (!targetElement) {
      setIsVisible(false);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const tooltipPosition = calculatePosition(rect, steps[currentStep].position);
    
    setPosition(tooltipPosition);
    setIsVisible(true);

    // Adicionar highlight ao elemento
    targetElement.classList.add('tutorial-highlight');
    
    return () => {
      targetElement.classList.remove('tutorial-highlight');
    };
  }, [isActive, currentStep, steps]);

  const calculatePosition = (rect: DOMRect, position: string) => {
    const offset = 20;
    
    switch (position) {
      case 'top':
        return {
          top: rect.top - offset,
          left: rect.left + rect.width / 2
        };
      case 'bottom':
        return {
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - offset
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + offset
        };
      default:
        return {
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2
        };
    }
  };

  if (!isActive || !isVisible || !steps[currentStep]) {
    return null;
  }

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 tutorial-overlay" />
      
      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border max-w-sm tutorial-tooltip"
        style={{
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -100%)'
        }}
      >
        {/* Seta do tooltip */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-gray-900">
              {currentStepData.title}
            </h3>
            <button
              onClick={endTutorial}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            {currentStepData.content}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}
              
              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                <span>{currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}</span>
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialTooltip;

