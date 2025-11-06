
import React, { useState } from 'react';
import { Product } from '../../types';
import Modal from '../common/Modal';

interface StockAdjustmentModalProps {
    product: Product;
    onClose: () => void;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({ product, onClose, setProducts, logActivity }) => {
    const [adjustment, setAdjustment] = useState(0);
    const [reason, setReason] = useState('');
    const newStock = product.stock + adjustment;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProducts(prev =>
            prev.map(p => (p.id === product.id ? { ...p, stock: newStock } : p))
        );
        logActivity(`Adjusted stock for ${product.name} by ${adjustment}. Reason: ${reason}`);
        onClose();
    };

    return (
        <Modal title={`Adjust Stock for ${product.name}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <p>Current Stock: {product.stock}</p>
                <div>
                    <label htmlFor="adjustment" className="block text-sm font-medium">Adjustment (+/-)</label>
                    <input
                        type="number"
                        id="adjustment"
                        value={adjustment}
                        onChange={e => setAdjustment(parseInt(e.target.value) || 0)}
                        className="w-full mt-1 p-2 border rounded-md"
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
                <p>New Stock Level: {newStock}</p>
                 <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Apply Adjustment</button>
                </div>
            </form>
        </Modal>
    );
};

export default StockAdjustmentModal;
