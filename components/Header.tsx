
import React, { useState } from 'react';
import { Role } from '../types';
import RoleSwitcher from './auth/RoleSwitcher';
import ShiftModal from './shift/ShiftModal';
import { ClockIcon } from './icons/ClockIcon';

interface HeaderProps {
    currentRole: Role;
    onRoleChange: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange }) => {
    const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
    
    return (
        <header className="h-16 bg-surface flex-shrink-0 border-b border-gray-200 flex items-center justify-between px-6">
            <div>
                {/* Search bar can go here */}
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setIsShiftModalOpen(true)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    <ClockIcon className="w-5 h-5" />
                    <span>Shift Management</span>
                </button>
                <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {currentRole.charAt(0)}
                </div>
            </div>
            {isShiftModalOpen && <ShiftModal onClose={() => setIsShiftModalOpen(false)} />}
        </header>
    );
};

export default Header;
