import { Button } from '@/components/ui/button';
import React from 'react';

const HoverButton = ({name, hover, color, text, textColor}: { name:string, hover:string, color:string, text:string, textColor:string}) => {
    return (
        <div>
            <Button className='p-3 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'>{name} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 5L19 12L12 19" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></Button>
        </div>
    );
};

export default HoverButton;