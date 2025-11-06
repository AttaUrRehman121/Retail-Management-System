
import React from 'react';
import { PurchaseOrder, Product } from '../../types';
import Modal from '../common/Modal';

interface ReceiveStockModalProps {
    purchaseOrder: PurchaseOrder;
    onClose: () => void;
    setPurchaseOrders: React.Dispatch<React.SetStateAction<PurchaseOrder[]>>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const ReceiveStockModal: React.FC<ReceiveStockModalProps> = ({ purchaseOrder, onClose, setPurchaseOrders, setProducts, logActivity }) => {

    const handleConfirmReceive = () => {
        // Update PO status
        const updatedPO = { ...purchaseOrder, status: 'Received' as const };
        setPurchaseOrders(prev => prev.map(po => po.id === purchaseOrder.id ? updatedPO : po));

        // Update product stock
        setProducts(prevProducts => {
            const newProducts = [...prevProducts];
            purchaseOrder.items.forEach(item => {
                const productIndex = newProducts.findIndex(p => p.id === item.productId);
                if (productIndex !== -1) {
                    newProducts[productIndex].stock += item.quantity;
                }
            });
            return newProducts;
        });

        logActivity(`Received stock for PO #${purchaseOrder.id}`);
        onClose();
    };

    return (
        <Modal title={`Receive Stock for PO #${purchaseOrder.id}`} onClose={onClose}>
            <div>
                <p className="mb-4">Are you sure you want to mark this purchase order as received? This will add the following items to your inventory:</p>
                <ul className="list-disc list-inside mb-6 bg-gray-100 p-4 rounded-md">
                    {purchaseOrder.items.map(item => (
                        <li key={item.productId}>{item.quantity} x (Product ID: {item.productId})</li>
                    ))}
                </ul>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={handleConfirmReceive} className="px-4 py-2 bg-primary text-white rounded-lg">Confirm & Add to Stock</button>
                </div>
            </div>
        </Modal>
    );
};

export default ReceiveStockModal;
