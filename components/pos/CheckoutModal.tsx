import React from 'react';
import Modal from '../common/Modal';
import { BanknotesIcon } from '../icons/icons';

interface CheckoutModalProps {
    total: number;
    onClose: () => void;
    onFinalize: (paymentMethod: 'Cash' | 'Card') => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose, onFinalize }) => {
    return (
        <Modal title="Payment" onClose={onClose}>
            <div className="text-center mb-6">
                <p className="text-lg">Total Amount Due</p>
                <p className="text-5xl font-bold">${total.toFixed(2)}</p>
            </div>
            <div className="space-y-4">
                <button
                    onClick={() => onFinalize('Cash')}
                    className="w-full flex items-center justify-center space-x-2 p-4 bg-green-500 text-white rounded-lg text-lg"
                >
                    <BanknotesIcon className="w-6 h-6" />
                    <span>Pay with Cash</span>
                </button>
                <button
                    onClick={() => onFinalize('Card')}
                    className="w-full p-4 bg-blue-500 text-white rounded-lg text-lg"
                >
                    Pay with Card
                </button>
            </div>
        </Modal>
    );
};

export default CheckoutModal;
