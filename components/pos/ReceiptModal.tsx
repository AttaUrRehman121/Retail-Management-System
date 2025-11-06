import React from 'react';
import { Sale } from '../../types';
import Modal from '../common/Modal';

interface ReceiptModalProps {
    sale: Sale;
    onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ sale, onClose }) => {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <Modal title={`Receipt for Sale #${sale.id.slice(-6)}`} onClose={onClose} wrapperClassName="max-w-sm">
            <div className="printable-area space-y-4 text-sm">
                <div className="text-center">
                    <h3 className="font-bold text-lg">My Awesome Store</h3>
                    <p>123 Demo Street, Suite 100</p>
                    <p>City, State 12345</p>
                </div>
                <div className="border-t border-b border-dashed py-2">
                    <p><strong>Sale ID:</strong> {sale.id}</p>
                    <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
                </div>
                <ul className="divide-y divide-dashed">
                    {sale.items.map(item => (
                        <li key={item.id} className="py-1 flex justify-between">
                            <div>
                                {item.quantity} x {item.name}
                                {item.discount && <span className="text-green-600"> (-{item.discount}%)</span>}
                            </div>
                            <span>${(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="border-t border-dashed pt-2 space-y-1">
                     <div className="flex justify-between"><span>Subtotal:</span><span>${sale.subtotal.toFixed(2)}</span></div>
                     <div className="flex justify-between"><span>Tax:</span><span>${sale.tax.toFixed(2)}</span></div>
                     <div className="flex justify-between font-bold text-base"><span>Total:</span><span>${sale.total.toFixed(2)}</span></div>
                </div>
                 <div className="border-t border-dashed pt-2">
                    <p><strong>Payment Method:</strong> {sale.paymentMethod}</p>
                </div>
                <div className="text-center pt-4">
                    <p>Thank you for your purchase!</p>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2 no-print">
                <button onClick={handlePrint} className="px-4 py-2 bg-gray-200 rounded-lg">Print</button>
                <button onClick={onClose} className="px-4 py-2 bg-primary text-white rounded-lg">New Sale</button>
            </div>
             <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </Modal>
    );
};

export default ReceiptModal;
