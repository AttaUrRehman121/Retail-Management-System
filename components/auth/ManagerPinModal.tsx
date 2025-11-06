
import React, { useState } from 'react';
import Modal from '../common/Modal';

interface ManagerPinModalProps {
    onClose: () => void;
    onPinSuccess: () => void;
}

// In a real app, this would be stored securely.
const MANAGER_PIN = '1234';

const ManagerPinModal: React.FC<ManagerPinModalProps> = ({ onClose, onPinSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === MANAGER_PIN) {
            onPinSuccess();
        } else {
            setError('Incorrect PIN. Please try again.');
            setPin('');
        }
    };

    return (
        <Modal title="Manager Authorization" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <p>Please enter the manager PIN to proceed.</p>
                <input
                    type="password"
                    value={pin}
                    onChange={handlePinChange}
                    className="w-full text-center text-2xl p-2 border rounded-md"
                    maxLength={4}
                    autoFocus
                />
                {error && <p className="text-danger text-sm text-center">{error}</p>}
                <button type="submit" className="w-full p-3 bg-primary text-white rounded-lg">Authorize</button>
            </form>
        </Modal>
    );
};

export default ManagerPinModal;
