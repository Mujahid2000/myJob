import React, { useState, useEffect } from 'react';

// Define the props interface for the AddColumnModal component
interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddColumn: (columnName: string) => void;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ isOpen, onClose, onAddColumn }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = (): void => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match the animation duration
  };

  const handleAddColumn = (): void => {
    if (columnName.trim()) {
      onAddColumn(columnName);
      setColumnName(''); // Reset input
      handleClose();
    }
  };

  if (!isOpen && !isVisible) return null;

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
        className={`relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 z-50 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Column</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label htmlFor="columnName" className="block text-sm text-gray-600 mb-1">
            Column Name
          </label>
          <input
            type="text"
            id="columnName"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Column Name"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-[#0A65CC] text-[#0A65CC] rounded-sm hover:bg-blue-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddColumn}
            className="px-4 py-2 bg-[#0A65CC] text-white rounded-sm hover:bg-blue-700 transition"
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddColumnModal;