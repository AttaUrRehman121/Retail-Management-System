import React from 'react';
import { Product, StockLedgerEntry } from '../../types';
import Modal from '../common/Modal';

interface StockLedgerModalProps {
    product: Product;
    stockLedger: StockLedgerEntry[];
    onClose: () => void;
}

const StockLedgerModal: React.FC<StockLedgerModalProps> = ({ product, stockLedger, onClose }) => {
    const productLedger = stockLedger.filter(entry => entry.productId === product.id);

    return (
        <Modal title={`Stock Ledger for ${product.name}`} onClose={onClose}>
            {productLedger.length === 0 ? (
                <p>No stock history for this product.</p>
            ) : (
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Date</th>
                            <th className="p-2">Change</th>
                            <th className="p-2">New Stock</th>
                            <th className="p-2">Reason</th>
                        </tr>
                    </thead>
                    <tbody className="text-on-surface">
                        {productLedger.map(entry => (
                            <tr key={entry.id} className="border-b">
                                <td className="p-2">{new Date(entry.date).toLocaleString()}</td>
                                <td className={`p-2 ${entry.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {entry.change > 0 ? `+${entry.change}` : entry.change}
                                </td>
                                <td className="p-2">{entry.newStock}</td>
                                <td className="p-2">{entry.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Modal>
    );
};

export default StockLedgerModal;