import React from 'react'

interface CellProps {
    type: string;
}

export const Cell: React.FC<CellProps> = ({ type }) => {
    const getCellContent = () => {
        switch (type) {
            case 'M':
            case 'E':
                return '';  // Hide mines and empty cells
            case 'X':
                return '💥';  // Only show explosion
            case 'B':
                return '';  // Show a white square for revealed empty cells
            case 'BB':
                return '💣';  // Show a black square for revealed empty cells
            default:
                return type;  // Show numbers
        }
    };

    const getCellStyle = () => {
        switch (type) {
            case 'M':
                return 'bg-green-200';  // Empty cell in green
            case 'E':
                return 'bg-green-200';  // Empty cell in green
            case 'X':
                return 'bg-red-500';
            case 'B':
                return 'bg-white';
            default:
                return 'bg-white';
        }
    };

    const getTextColor = () => {
        if (type === '1') return 'text-blue-600';
        if (type === '2') return 'text-green-600';
        if (type === '3') return 'text-red-600';
        if (type === '4') return 'text-purple-600';
        if (type === '5') return 'text-yellow-600';
        if (type === '6') return 'text-pink-600';
        if (type === '7') return 'text-gray-600';
        if (type === '8') return 'text-black';
        return '';
    };

    return (
        <div className={`w-full h-full flex items-center justify-center ${getCellStyle()} ${getTextColor()} font-bold`}>
            {getCellContent()}
        </div>
    );
};
