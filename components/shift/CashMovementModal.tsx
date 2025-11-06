
import React, { useState } from 'react';
import Modal from '../common/Modal';

interface CashMovementModalProps {
    type: 'in' | 'out';
    onClose: () => void;
    onConfirm: (amount: number, reason: string) => void;
}

const CashMovementModal: React.FC<CashMovementModalProps> = ({ type, onClose, onConfirm }) => {
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState('');

    const title = type === 'in' ? 'Cash In' : 'Cash Out';
    const buttonText = type === 'in' ? 'Add Cash' : 'Remove Cash';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0 && reason) {
            onConfirm(amount, reason);
        }
    };

    return (
        <Modal title={title} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full mt-1 p-2 border rounded-md"
                        step="0.01"
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium">Reason</label>
                    <input
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">{buttonText}</button>
                </div>
            </form>
        </Modal>
    );
};

export default CashMovementModal;
