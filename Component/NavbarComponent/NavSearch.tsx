'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const NavSearch = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>('');
    const [country, setCountry] = useState<string>('')



    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const params =new URLSearchParams();
            if(searchValue){
                params.set('jobRole', searchValue)
            };
            if(country){
                params.set('location', country)
            }
            router.push(`/find-job?${params.toString()}`)
            // Optionally trigger search here
        }
    };

    return (
        <div className=''>
            <div className="flex items-center gap-2 bg-white rounded-sm border flex-row-reverse max-w-full xl:w-[500px] px-3 py-1">
                  <Input
                    type="text"
                    placeholder="Job tittle, keyword..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 border-none focus:outline-none outline-none px-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <FiSearch className="text-blue-500 text-lg" />
                  <Select onValueChange={(value)=>setCountry(value)}>
                    <SelectTrigger  className="w-32 shadow-none focus:outline-none border-none bg-transparent">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent className="border-none shadow-md focus:outline-none">
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="Nepal">Nepal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
        </div>
    );
};

export default NavSearch;