import React from 'react';
import { Button } from "@/components/ui/button"


const ButtonCommon = ({ name }: { name: string;}) => {

    return (
        <div>
            <Button className="px-6 py-4 bg-[#0A65CC] text-white rounded-sm hover:bg-blue-700">{name}</Button>
        </div>
    );
};

export default ButtonCommon;