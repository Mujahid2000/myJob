'use client'
import React, { useState } from 'react';
import { LiaEditSolid } from "react-icons/lia";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CircleX, MoveRight } from 'lucide-react';

// Define the interface for an invoice
interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: string;
}

// Sample data for invoices
const invoices: Invoice[] = [
  { id: '#48741', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
  { id: '#63518', date: 'Dec 7, 2019 23:26', plan: 'Standard', amount: '$999 USD' },
  { id: '#62740', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
  { id: '#65135', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
  { id: '#48903', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
  { id: '#58612', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
];

const page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Display 5 invoices per page

  // Calculate pagination
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className=" min-h-screen">
      <div className='flex gap-3'>
{/* Current Plan and Plan Benefits */}
<div className="grid grid-row-1 md:grid-row-2  gap-6 mb-6">
        {/* Current Plan */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Current Plan</h2>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium</h3>
          <p className="text-sm text-gray-600 mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.
          </p>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Change Plans
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition">
              Cancel Plan
            </button>
          </div>
        </div>

         {/* Next Invoice */}
         <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Next Invoice</h2>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">$59.00 USD</h3>
          <p className="text-sm text-gray-600 mb-4">
            Nov 28, 2021
            <br />
            Package started: Jan 28, 2021
            <br />
            We have to pay this payment every month.
          </p>
          <button className="px-4 flex text-base items-center justify-center gap-5  w-full py-3 bg-[#0A65CC] text-white rounded-sm hover:bg-blue-700 transition">
            Pay Now <MoveRight />
          </button>
        </div>
      </div>

      {/* Next Invoice and Payment Card */}
      <div className="grid grid-cols-1 md:grid-row-2  gap-6 mb-6">
       

        {/* Plan Benefits */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Benefits</h2>
          <p className="text-sm text-gray-600 mb-4">
            Proin porta eu arcu a placerat finibus. Sed eget laoreet lorem.
          </p>
          <ul className="space-y-2 grid grid-cols-2 text-xs border-b py-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> 6 Active Jobs
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> Urgents & Featured Jobs
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> Highlights Job with Colors
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> Access & Saved 20 Candidates
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> 60 Days Resume Visibility
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✔️</span> 24/7 Critical Support
            </li>
          </ul>
          <div>
          <h2>Remaining</h2>

          <div className="mt-4 grid grid-cols-2 ">
            
            <span className="inline-flex items-center mb-1  gap-2 text-red-600 text-sm">
              <CircleX />9 Resume Access
            </span>
            <span className="inline-flex items-center mb-1 gap-2  text-red-600 text-sm">
              <CircleX />21 Days resume visibility
            </span>
            <span className="inline-flex items-center  mb-1 gap-2 text-red-600 text-sm">
              <CircleX />4 Active Jobs
            </span>
          </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Payment Card</h2>
            <button className="text-gray-600 flex items-center text-base"><LiaEditSolid />   Edit Card</button>
          </div>
          <div className="flex  border-b py-2 justify-between items-center mb-2">
            <div className='flex'>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="w-12 h-8 mr-4"
            />
            <div>
              <p className="text-sm text-gray-600">Name on card</p>
              <p className="text-base font-bold text-gray-800">Esther Howard</p>
            </div>
                
            </div>
            <div className='flex'>
          <div>
          <p className="text-sm text-gray-600">Expire date:</p>
          <p className="text-sm text-gray-600">12/29</p>
          </div>
            </div>
          </div>
          <h2 className='text-2xl font-semibold'>6714 **** **** ****</h2>
        </div>
      </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Last Invoices</h2>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-200'>
              <TableHead className="text-gray-600">ID</TableHead>
              <TableHead className="text-gray-600">DATE</TableHead>
              <TableHead className="text-gray-600">PLAN</TableHead>
              <TableHead className="text-gray-600">AMOUNT</TableHead>
              <TableHead className="text-gray-600"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="text-gray-600">{invoice.id}</TableCell>
                <TableCell className="text-gray-600">{invoice.date}</TableCell>
                <TableCell className="text-gray-600">{invoice.plan}</TableCell>
                <TableCell className="text-gray-600">{invoice.amount}</TableCell>
                <TableCell>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className={currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600'}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default page;