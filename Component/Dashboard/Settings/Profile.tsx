import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus, CloudUpload, FileText } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const resumes = [
  { id: 1, title: 'Professional Resume', size: '1.5 MB' },
  { id: 2, title: 'Product Designer', size: '4.7 MB' },
  { id: 3, title: 'Visual Designer', size: '1.8 MB' },
];

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFiles] = useState<File | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [uploadCv, setUploadCV] = useState<File | null>(null); // Fixed type to File | null
  const [resumeName, setResumeName] = useState<string>(''); // Added state for text input

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent): void => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file.');
        setFiles(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB.');
        setFiles(null);
        return;
      }
      setFiles(file);
    }
  };

  const handleUploadCV = (e: FileChangeEvent): void => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file.');
        setUploadCV(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB.');
        setUploadCV(null);
        return;
      }
      setUploadCV(file);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { resumeName, uploadCv });
    setOpen(false);
    setResumeName('');
    setUploadCV(null);
  };

  return (
    <div className="p-6 min-h-screen max-w-5xl mx-auto">
      {/* Basic Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">BASIC INFORMATION</h2>
        <div className="rounded-lg pt-3 max-h-screen bg-white">
          <h1 className="py-2">Profile Picture</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Profile Picture Upload */}
            <div className="flex relative max-h-[230px] flex-col border-2 border-dashed border-gray-300 rounded-lg items-center relative">
              {image ? (
                <>
                  <img
                    id="image-preview"
                    src={image || undefined}
                    alt="Preview"
                    className="w-full h-full rounded-lg absolute"
                  />
                  <button
                    id="remove-image"
                    className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                    onClick={() => setImage(null)}
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 3000000) {
                            alert(
                              'File size exceeds the maximum limit of 5 MB.'
                            );
                          } else {
                            setImage(URL.createObjectURL(file));
                          }
                        }
                      }}
                    />
                    <CloudUpload size={44} className="text-gray-400" />
                  </div>
                  <p className="text-sm relative text-gray-500 mt-2 text-center">
                    BROWSE PHOTO or drop here
                  </p>
                  <p className="text-xs relative text-gray-400 text-center">
                    A photo larger than 400 pixels works best. Max photo size 5 MB
                  </p>
                </>
              )}
            </div>

            {/* Form Fields */}
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    TITLE/HEADLINE
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Title/headline..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    EXPERIENCE
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Select...</option>
                    <option>Less than 1 year</option>
                    <option>1 year</option>
                    <option>2 year</option>
                    <option>3 year</option>
                    <option>5 year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    EDUCATION
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Select...</option>
                    <option>S.S.C</option>
                    <option>H.S.C</option>
                    <option>Computer Science & Engineering</option>
                    <option>M.S.C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PERSONAL WEBSITE
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="🔗 Website url..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-[#0A65CC] text-white px-6 py-3 hover:bg-blue-700">
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your CV/Resume Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">YOUR CV/RESUME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resumes.map((resume, index) => (
            <div key={resume.id} className="border rounded-sm p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">
                    <FileText />
                  </span>
                  <div>
                    <p className="font-medium">{resume.title}</p>
                    <p className="text-sm text-gray-500">{resume.size}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    aria-label="More options"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === resume.id ? null : resume.id
                      )
                    }
                  >
                    ⋯
                  </button>
                  {activeDropdown === resume.id && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[index] = el;
                      }}
                      className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setOpen(true);
                          setActiveDropdown(null);
                        }}
                      >
                        Edit Resume
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          console.log(`Delete resume ${resume.id}`);
                          setActiveDropdown(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 border p-4 rounded-sm">
            {file ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-500" />
                    <p className="font-medium">{file.name}</p>
                  </div>
                  <p className="flex gap-2 pt-1 items-center">
                    {(file.size / 1024).toFixed(2)}
                    <span>kb</span>
                  </p>
                </div>
                <button
                  className="text-gray-400 cursor-pointer hover:text-blue-500"
                  onClick={() => setFiles(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="cursor-pointer">
                <button className="flex items-center cursor-pointer text-blue-600">
                  <input
                    onChange={handleFileChange}
                    accept=".pdf"
                    type="file"
                    className="absolute opacity-0"
                  />
                  <span className="px-2">
                    <CirclePlus />
                  </span>
                  <p className="text-black font-medium cursor-pointer">
                    Add CV/Resume
                  </p>
                </button>
                <p className="text-xs text-gray-400 mt-1 cursor-pointer">
                  Browse file or drop here, only .pdf
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`${
          open ? 'visible' : 'invisible'
        } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            open ? 'scale-[1] opacity-100' : 'scale-[0] opacity-0'
          } w-[27%] rounded-lg transition-all duration-300 mx-auto mt-8`}
        >
          <form
            className="max-w-lg p-6 bg-white rounded-lg space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold">Add CV/Resume</h2>

            {/* Resume Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CV/Resume Name
              </label>
              <Input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="Enter resume name"
                className="rounded-sm"
              />
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed py-5">
              {uploadCv ? (
                <div className="flex items-center justify-between px-4">
                  <p className="text-sm text-gray-700">
                    {uploadCv.name} (
                    {(uploadCv.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => setUploadCV(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <label
                    htmlFor="cv-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <CloudUpload size={44} className="text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">
                      BROWSE PDF or drop here
                    </p>
                    <p className="text-xs text-gray-400">
                      Max file size 5 MB, only .pdf
                    </p>
                  </label>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleUploadCV}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setResumeName('');
                  setUploadCV(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="hover:bg-[#D6E7FB] cursor-pointer bg-[#0A65CC] hover:text-[#0A65CC] text-white w-[13rem] px-[2rem] py-[1rem] rounded-none"
              >
                Add Cv/Resume →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;