import { CloudUpload } from "lucide-react";
import { useState } from "react";

export default function CompanyInfo() {
    const [image, setImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Logo & Banner Image</h2>
          <div className="flex gap-5">
            <div className="flex-1 relative flex flex-col border-2 border-dashed border-gray-300 rounded-lg items-center justify-center p-4">
              {image ? (
                <div className="relative w-full h-40">
                  <img
                    id="image-preview"
                    src={image || undefined}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    id="remove-image"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                    onClick={() => setImage(null)}
                  >
                    ✕
                  </button>
                </div>
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
                          if (file.size > 5000000) {
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
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Browse photo or drop here
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                    A photo larger than 400 pixels works best. Max photo size 5 MB.
                  </p>
                </>
              )}
            </div>
            <div className="flex-2 relative flex flex-col border-2 border-dashed border-gray-300 rounded-lg items-center justify-center p-4">
              {bannerImage ? (
                <div className="relative w-full h-40">
                  <img
                    id="image-preview"
                    src={bannerImage || undefined}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    id="remove-image"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                    onClick={() => setBannerImage(null)}
                  >
                    ✕
                  </button>
                </div>
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
                          if (file.size > 5000000) {
                            alert(
                              'File size exceeds the maximum limit of 5 MB.'
                            );
                          } else {
                            setBannerImage(URL.createObjectURL(file));
                          }
                        }
                      }}
                    />
                    <CloudUpload size={44} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                  Browse photo or drop here
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                  Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company name</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="border border-gray-300 rounded-md">
          <label className="block text-sm px-3 py-2 font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write down your biography here. Let the employer know who you are..."
            className="mt-1 block h-56 w-full  px-3 py-2 h-32"
          />
          <div className="mt-2 px-3 py-2 flex space-x-2 text-gray-500">
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐁</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑰</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑼</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑺</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">🔗</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐻</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">≡</button>
          </div>
        </div>
      </div>
    );
  }