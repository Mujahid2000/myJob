'use client';
import { useState } from 'react';

interface JobFormData {
  title: string;
  tags: string;
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  salaryType: string;
  education: string;
  experience: string;
  jobType: string;
  jobLevel: string;
  vacancies: string;
  expiryDate: string;
  applyMethod: string;
  description: string;
  responsibilities: string;
}

const PostAJob: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    tags: '',
    jobRole: '',
    minSalary: '',
    maxSalary: '',
    salaryType: '',
    education: '',
    experience: '',
    jobType: '',
    jobLevel: '',
    vacancies: '',
    expiryDate: '',
    applyMethod: 'on_jobpilot',
    description: '',
    responsibilities: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call or further logic here
  };

  return (
    <div className="max-w-7xl mx-auto  bg-white ">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Post a job</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add job title, role, vacancies etc..."
          />
        </div>

        {/* Tags and Job Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Job keyword, tags etc..."
            />
          </div>
          <div>
            <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">
              Job Role
            </label>
            <select
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">
                Min Salary
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="minSalary"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Minimum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
                Max Salary
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="maxSalary"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="salaryType" className="block text-sm font-medium text-gray-700">
                Salary Type
              </label>
              <select
                id="salaryType"
                name="salaryType"
                value={formData.salaryType}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Advance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="bachelor">Bachelor’s</option>
                <option value="master">Master’s</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700">
                Job Level
              </label>
              <select
                id="jobLevel"
                name="jobLevel"
                value={formData.jobLevel}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
            </div>
            <div>
              <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700">
                Vacancies
              </label>
              <select
                id="vacancies"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>

        {/* Apply Job On */}
        <div className="bg-gray-50 p-4 rounded-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Apply Job on:</h3>
          <div className=" flex items-center">
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                name="applyMethod"
                value="on_jobpilot"
                checked={formData.applyMethod === 'on_jobpilot'}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                On Jobpilot
                <p className="text-xs text-gray-500">
                  Candidate will apply using jobpilot & all application show on your dashboard.
                </p>
              </span>
            </label>
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                name="applyMethod"
                value="external_platform"
                checked={formData.applyMethod === 'external_platform'}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                External Platform
                <p className="text-xs text-gray-500">
                  Candidate apply on job using your own website, all application on your website.
                </p>
              </span>
            </label>
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                name="applyMethod"
                value="email"
                checked={formData.applyMethod === 'email'}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                On Your Email
                <p className="text-xs text-gray-500">
                  Candidate apply on job using your email address, all application in your email.
                </p>
              </span>
            </label>
          </div>
        </div>

        {/* Description & Responsibilities */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Description & Responsibility</h3>
          <div className="space-y-4">
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-[#0A65CC] text-white px-6 py-3 rounded-sm font-semibold hover:bg-blue-600 flex items-center gap-2"
          >
            Post Job
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAJob;