// components/Profile.js
import { CirclePlus, CloudUpload, FileText, Plus } from 'lucide-react';
import React, { useState } from 'react';

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFiles] = useState<File | null>(null);
 
  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent): void => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation: Check if the file is a PDF
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file.');
        setFiles(null);
        return;
      }
      // Check file size (e.g., max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB.');
        setFiles(null);
        return;
      }
      setFiles(file);
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Basic Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold ">BASIC INFORMATION</h2>
        <div className=" rounded-lg pt-3 max-h-screen bg-white ">
          <h1 className='py-2'>Profile Picture</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Profile Picture Upload */}
            <div className="flex relative  max-h-[230px] flex-col border-2 border-dashed border-gray-300 rounded-lg items-center relative">
            {
              image ? (
                <>
                  <img
                    id="image-preview"
                    src={image || undefined}
                    alt="Preview"
                    className="w-full h-full  rounded-lg absolute "
                  />
                  <button
                    id="remove-image"
                    className="absolute  cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                    onClick={() => setImage(null)}
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <div className="w-32  h-32 flex items-center  justify-center overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 3000000) {
                            alert("File size exceeds the maximum limit of 5 MB.");
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
              )
            }
            </div>

            {/* Form Fields */}
            <div className="col-span-2  space-y-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">FULL NAME</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">TITLE/HEADLINE</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Title/headline..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">EXPERIENCE</label>
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
                  <label className="block text-sm font-medium text-gray-700">EDUCATION</label>
                  <select
                    className="mt-1  block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label className="block text-sm font-medium text-gray-700">PERSONAL WEBSITE</label>
                <div className="flex items-center mt-1">
                  
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="🔗 Website url..."
                  />
                </div>
              </div>


          <div className="mt-6  ">
            <button className="bg-[#0A65CC] text-white px-6 py-3  hover:bg-blue-700">
              SAVE CHANGES
            </button>
          </div>
            </div>
          </div>

          {/* Save Changes Button */}
        </div>
      </div>

      {/* Your CV/Resume Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">YOUR CV/RESUME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Resume Card 1 */}
          <div className="border rounded-sm p-4 bg-white ">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2"><FileText /></span>
                <div>
                  <p className="font-medium">Professional Resume</p>
                  <p className="text-sm text-gray-500">1.5 MB</p>
                </div>
              </div>
              <button className="text-gray-400">⋯</button>
            </div>
          </div>

          {/* Resume Card 2 */}
          <div className="border rounded-sm p-4 bg-white ">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2"><FileText /></span>
                <div>
                  <p className="font-medium">Product Designer</p>
                  <p className="text-sm text-gray-500">4.7 MB</p>
                </div>
              </div>
              <div className="relative">
                <button className="text-gray-400">⋯</button>
                {/* Dropdown Menu */}
                <div className="hidden absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Edit Resume
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Card 3 */}
          <div className="border rounded-sm p-4 bg-white ">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2"><FileText /></span>
                <div>
                  <p className="font-medium">Visual Designer</p>
                  <p className="text-sm text-gray-500">1.8 MB</p>
                </div>
              </div>
              <button className="text-gray-400">⋯</button>
            </div>
          </div>
        <div className="mt-4 border p-4 rounded-sm">
          {
            file? <div > <div className='flex items-center gap-3'><FileText className='text-blue-500'/>{file.name}</div> <p className='flex gap-2 pt-1 items-center'>{(file.size / 1024).toFixed(2)}
            <span>kb</span></p></div> : <><button className="flex items-center text-blue-600">
                <input onChange={handleFileChange} accept='.pdf' type='file' className="absolute opacity-0" />
                <span className='px-2'><CirclePlus /></span>
                <p className='text-black font-medium'>Add CV/Resume</p>
              </button><p className="text-xs text-gray-400 mt-1">
                  Browse file or drop here, only .pdf
                </p></>
          }
        </div>
        </div>

        {/* Add CV/Resume Button */}
      </div>
    </div>
  );
};

export default Profile;