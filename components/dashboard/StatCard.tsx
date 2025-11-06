
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-surface p-4 rounded-xl shadow-sm border flex items-center space-x-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm text-on-surface-variant">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
