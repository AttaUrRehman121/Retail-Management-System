
import React from 'react';
import { HeldSale } from '../../types';
import Modal from '../common/Modal';
import { ArrowUpTrayIcon, TrashIcon } from '../icons/icons';

interface HeldSalesModalProps {
    heldSales: HeldSale[];
    onClose: () => void;
    onRestore: (saleId: string) => void;
    onDelete: (saleId: string) => void;
}

const HeldSalesModal: React.FC<HeldSalesModalProps> = ({ heldSales, onClose, onRestore, onDelete }) => {
    return (
        <Modal title="Held Sales" onClose={onClose}>
            <div className="space-y-4">
                {heldSales.length === 0 ? (
                    <p>No sales are currently on hold.</p>
                ) : (
                    <ul className="divide-y max-h-96 overflow-y-auto">
                        {heldSales.map(sale => (
                            <li key={sale.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{sale.name || `Sale held at ${new Date(sale.timestamp).toLocaleTimeString()}`}</p>
                                    <p className="text-sm text-on-surface-variant">{sale.cart.length} items</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => onRestore(sale.id)} className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">
                                        <ArrowUpTrayIcon className="w-4 h-4" />
                                        <span>Restore</span>
                                    </button>
                                    <button onClick={() => onDelete(sale.id)} className="p-2 text-danger hover:bg-danger/10 rounded-full">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Modal>
    );
};

export default HeldSalesModal;
