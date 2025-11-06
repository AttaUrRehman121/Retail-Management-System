
import React, { useState } from 'react';
import { Role } from '../../types';
import ManagerPinModal from './ManagerPinModal';

interface RoleSwitcherProps {
    currentRole: Role;
    onRoleChange: (role: Role) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const handleRoleChange = (role: Role) => {
        if (role === Role.Manager) {
            setIsPinModalOpen(true);
        } else {
            onRoleChange(Role.Cashier);
        }
    };

    const handlePinSuccess = () => {
        onRoleChange(Role.Manager);
        setIsPinModalOpen(false);
    };

    return (
        <div>
            <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="bg-gray-100 border-none rounded-lg p-2"
            >
                <option value={Role.Cashier}>Cashier</option>
                <option value={Role.Manager}>Manager</option>
            </select>
            {isPinModalOpen && <ManagerPinModal onClose={() => setIsPinModalOpen(false)} onPinSuccess={handlePinSuccess} />}
        </div>
    );
};

export default RoleSwitcher;
