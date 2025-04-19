import React, { useState, useEffect } from 'react';

// Define the props interface for the SuccessModal component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewJobs: () => void;
  onPromoteJob: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onViewJobs, onPromoteJob }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSkip, setShowSkip] = useState<boolean>(false)
  const [select, setSelect] = useState<string | null>(null);


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = (): void => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match the animation duration
  };

  if (!isOpen && !isVisible) return null;


const handlePromote = (bol: boolean) => {
    if (showSkip !== bol) {
        setShowSkip(bol);
    }
};

const handleSelectBorder = (sel: string) => {
    setSelect((prevSelect) => (prevSelect !== sel ? sel : prevSelect));
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        } backdrop-blur-sm`}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl transform transition-all duration-300 z-50 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
       {
        select == null ? 
        <><div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                              <span className="text-yellow-500 mr-2">🎉</span>
                              <h2 className="text-lg font-semibold">
                                  Congratulations, Your Job is successfully posted!
                              </h2>
                          </div>
                          <button onClick={handleClose} className="text-gray-500 p-2 rounded-full hover:bg-gray-100 cursor-pointer hover:text-gray-700">
                              ✕
                          </button>
                      </div><p className="text-gray-600 mb-6">
                              You can manage your form my-jobs section in your dashboard
                          </p><button
                              onClick={onViewJobs}
                              className="bg-[#0A65CC] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-6"
                          >
                              View Jobs →
                          </button></>
        :
        
        <p></p>
       }

        {/* Promote Job Section */}
        <h3 className="text-lg font-semibold mb-2">Promote Job: UI/UX Designer</h3>
        <p className="text-gray-600 mb-4">
          Fusce commodo, sem non tempor convallis, sapien turpis bibendum turpis, non pharetra mi velit pulvinar lectus. Suspendisse varius at nisl aliquam.
        </p>

        {/* Promotion Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Always on the Top */}
          <div onClick={()=>handleSelectBorder('top')} className={`${select == 'top' ? 'border border-blue-500' : 'border border-gray-200'} rounded-lg p-4`}>
            <h4 className="font-semibold mb-2">ALWAYS ON THE TOP</h4>
            <div className="flex items-center mb-2">
              <div className="w-1/3 h-2 bg-blue-500 rounded"></div>
              <div className="w-2/3 h-2 bg-gray-200 rounded ml-1"></div>
            </div>
            <p className="text-gray-600 text-sm">
              Sed neque diam, lacinia nec dolor et, euismod bibendum turpis. Sed feugiat faucibus.
            </p>
            <div className="flex items-center mt-2">
              <input onClick={()=>handlePromote(true)} type="radio" name="promotion" className="mr-2" />
              <span>Featured Your Job</span>
            </div>
          </div>

          {/* Highlight Job with Color */}
          <div onClick={()=>handleSelectBorder('highlight')} className={`${select == 'highlight' ? 'border border-blue-300': 'border border-gray-200'} rounded-lg p-4`}>
            <h4 className="font-semibold mb-2">HIGHLIGHT JOB WITH COLOR</h4>
            <div className="flex items-center mb-2">
              <div className="w-1/3 h-2 bg-yellow-400 rounded"></div>
              <div className="w-2/3 h-2 bg-gray-200 rounded ml-1"></div>
            </div>
            <p className="text-gray-600 text-sm">
              Sed neque diam, lacinia nec dolor et, euismod bibendum turpis. Sed feugiat faucibus.
            </p>
            <div className="flex items-center mt-2">
              <input onClick={()=>handlePromote(true)}  type="radio" name="promotion" className="mr-2" />
              <span>Highlight Your Job</span>
            </div>
          </div>
        </div>

        {/* Skip and Promote Buttons */}
        <div className="flex  justify-between items-center">
         {
            showSkip== true? 
<button onClick={handleClose} className="text-gray-600 cursor-pointer hover:text-gray-800">
            Cancel
          </button>
            :
            <button onClick={handleClose} className="text-gray-600 cursor-pointer hover:text-gray-800">
            Skip Now
          </button>
         }
          
          <button
            onClick={onPromoteJob}
            className="bg-[#0A65CC] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Promote Job →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;