"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Paperclip,
  ImageIcon,
  Smile,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { mailModal } from "@/Store/ModalSlice";

export default function MailComposer() {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const mailModalState = useSelector(
    (state: RootState) => state.modal.mailModal
  );
  const dispatch = useDispatch();

  const addAttachment = () => {
    setAttachments([...attachments, `document-${attachments.length + 1}.pdf`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Handle modal closing with animation
  const handleClose = () => {
    setMounted(false); // Start closing animation
    setTimeout(() => {
      dispatch(mailModal({ openMail: false })); // Update Redux state after animation
    }, 300); // Match with CSS transition duration
  };

  // Handle escape key and modal animation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (mailModalState) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Set mounted after a small delay to trigger the opening animation
      setTimeout(() => setMounted(true), 10);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mailModalState]);

  // Reset mounted state when modal is closed
  useEffect(() => {
    if (!mailModalState) {
      setMounted(false);
    }
  }, [mailModalState]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {mailModalState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with fade animation */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              mounted ? "opacity-25" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Modal with animation */}
          <div
            className={`relative w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-4xl mx-auto bg-white md:rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
              mounted
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 bg-white">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                Compose Email
              </h1>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto h-full md:h-auto md:max-h-[calc(90vh-80px)]">
              <div className="p-4 md:p-6">
                <form className="space-y-4">
                  {/* To Field */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label
                        htmlFor="to"
                        className="text-sm font-medium text-gray-700 sm:min-w-16"
                      >
                        To
                      </label>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          id="to"
                          type="email"
                          placeholder="recipient@example.com"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <div className="flex gap-1 sm:hidden">
                         
                            <button
                              type="button"
                             
                              className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                            >
                              Cc
                            </button>
                          
                         
                            <button
                              type="button"
                              
                              className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                            >
                              Bcc
                            </button>
                        
                        </div>
                      </div>
                      
                    </div>
                  </div>

                  {/* CC Field with animation */}
                  <div
                    className={`space-y-2 transition-all duration-300 ease-in-out `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label
                        htmlFor="cc"
                        className="text-sm font-medium text-gray-700 sm:min-w-16"
                      >
                        Cc
                      </label>
                      <input
                        id="cc"
                        type="email"
                        placeholder="cc@example.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      
                    </div>
                  </div>

                  {/* BCC Field with animation */}
                  <div
                    className={`space-y-2 transition-all duration-300 ease-in-out `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label
                        htmlFor="bcc"
                        className="text-sm font-medium text-gray-700 sm:min-w-16"
                      >
                        Bcc
                      </label>
                      <input
                        id="bcc"
                        type="email"
                        placeholder="bcc@example.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700 sm:min-w-16"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        placeholder="Enter subject"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Attachments with animation */}
                  {attachments.length > 0 && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="text-sm font-medium text-gray-700">
                        Attachments
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border animate-scaleIn"
                          >
                            <Paperclip className="h-3 w-3" />
                            <span className="max-w-32 truncate">
                              {attachment}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="ml-1 p-0.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="space-y-2">
                    <textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none ring-blue-500 focus:border-blue-500 text-sm resize-none md:rows-12"
                    />
                  </div>

                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
                    {/* Toolbar buttons */}
                    <div className="flex items-center gap-1 overflow-x-auto">
                      <button
                        type="button"
                        onClick={addAttachment}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span className="hidden sm:inline">Attach</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Image</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
                      >
                        <Smile className="h-4 w-4" />
                        <span className="hidden sm:inline">Emoji</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:none ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        Save Draft
                      </button>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:none ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
