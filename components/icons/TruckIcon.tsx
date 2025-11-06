import React from 'react';

export const TruckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M10.5 1.5H5.25A2.25 2.25 0 0 0 3 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 20.25V10.5M10.5 1.5L15 6h4.5a2.25 2.25 0 0 1 2.25 2.25v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18h.008v.008h-.008V18Zm15 0h.008v.008h-.008V18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5V6h-6v12" />
    </svg>
);