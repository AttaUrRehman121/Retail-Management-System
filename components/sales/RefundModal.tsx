
import React from 'react';
import { Sale, Product } from '../../types';
import Modal from '../common/Modal';

interface RefundModalProps {
    sale: Sale;
    onClose: () => void;
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const RefundModal: React.FC<RefundModalProps> = ({ sale, onClose, setSales, products, setProducts, logActivity }) => {
    const handleConfirmRefund = () => {
        // Create a new refund sale record
        const refundSale: Sale = {
            ...sale,
            id: `REFUND-${Date.now()}`,
            type: 'Refund',
            total: -sale.total, // Negative total for refund
        };

        // Mark original sale as refunded (or update its status)
        const updatedOriginalSale: Sale = { ...sale, type: 'Refund' };
        
        setSales(prev => [refundSale, ...prev.map(s => s.id === sale.id ? updatedOriginalSale : s)]);

        // Add stock back
        const newProducts = [...products];
        sale.items.forEach(item => {
            const productIndex = newProducts.findIndex(p => p.id === item.id);
            if (productIndex !== -1) {
                newProducts[productIndex].stock += item.quantity;
            }
        });
        setProducts(newProducts);
        
        logActivity(`Processed refund for sale #${sale.id.slice(-6)}`);
        onClose();
    };

    return (
        <Modal title={`Refund Sale #${sale.id.slice(-6)}`} onClose={onClose}>
            <div className="space-y-4">
                <p>Are you sure you want to process a full refund for this sale?</p>
                <p className="font-bold text-lg">Total to Refund: ${sale.total.toFixed(2)}</p>
                <div className="flex justify-end space-x-2 pt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={handleConfirmRefund} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Confirm Refund</button>
                </div>
            </div>
        </Modal>
    );
};

export default RefundModal;
