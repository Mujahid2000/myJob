import { useState } from "react";

export default function Contact() {
     const [contactInfo, setContactInfo] = useState({
        phone: '',
        email: '',
      });
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Map Location</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
            <label className=" text-sm font-medium px-2 justify-center text-gray-700 mb-1">
              PHONE
            </label>
            <div className="flex border border-gray-300 rounded-md items-center">
              <select
                className="p-2 focus:outline-none text-gray-600"
              >
                <option>🇧🇩+880</option>
                <option>🇵🇰+92</option>
                <option>🇲🇾+60</option>
                <option>🇹🇷+90</option>
              </select>
              <input
                type="text"
                placeholder="Phone number..."
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
                className="w-full  border-none rounded-sm   py-2  px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>
          </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center mt-1">
            <input type="email" placeholder="📧Email address" className="block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
      </div>
    );
  }