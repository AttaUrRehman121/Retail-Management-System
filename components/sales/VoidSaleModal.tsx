
import React from 'react';
import { Sale, Product } from '../../types';
import Modal from '../common/Modal';

interface VoidSaleModalProps {
    sale: Sale;
    onClose: () => void;
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const VoidSaleModal: React.FC<VoidSaleModalProps> = ({ sale, onClose, setSales, setProducts, logActivity, products }) => {
    const handleConfirmVoid = () => {
        // Mark sale as voided
        const updatedSale: Sale = { ...sale, type: 'Void' };
        setSales(prev => prev.map(s => s.id === sale.id ? updatedSale : s));

        // Add stock back
        const newProducts = [...products];
        sale.items.forEach(item => {
            const productIndex = newProducts.findIndex(p => p.id === item.id);
            if (productIndex !== -1) {
                newProducts[productIndex].stock += item.quantity;
            }
        });
        setProducts(newProducts);
        
        logActivity(`Voided sale #${sale.id.slice(-6)}`);
        onClose();
    };

    return (
        <Modal title={`Void Sale #${sale.id.slice(-6)}`} onClose={onClose}>
            <div className="space-y-4">
                <p>Are you sure you want to void this sale? This action cannot be undone and will reverse the transaction.</p>
                <div className="flex justify-end space-x-2 pt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={handleConfirmVoid} className="px-4 py-2 bg-danger text-white rounded-lg">Confirm Void</button>
                </div>
            </div>
        </Modal>
    );
};

export default VoidSaleModal;
