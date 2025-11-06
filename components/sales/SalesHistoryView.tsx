
import React, { useState } from 'react';
import { Sale, Product } from '../../types';
import RefundModal from './RefundModal';
import VoidSaleModal from './VoidSaleModal';
import ReceiptModal from '../pos/ReceiptModal';
import { ArrowUturnLeftIcon, NoSymbolIcon } from '../icons/icons';

interface SalesHistoryViewProps {
    sales: Sale[];
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const SalesHistoryView: React.FC<SalesHistoryViewProps> = ({ sales, setSales, products, setProducts, logActivity }) => {
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [isVoidModalOpen, setIsVoidModalOpen] = useState(false);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

    const openRefundModal = (sale: Sale) => {
        setSelectedSale(sale);
        setIsRefundModalOpen(true);
    };
    
    const openVoidModal = (sale: Sale) => {
        setSelectedSale(sale);
        setIsVoidModalOpen(true);
    };

    const openReceiptModal = (sale: Sale) => {
        setSelectedSale(sale);
        setIsReceiptModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Sales History</h1>
            <div className="bg-surface rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Sale ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-on-surface">
                        {[...sales].reverse().map(sale => (
                            <tr key={sale.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm">...{sale.id.slice(-6)}</td>
                                <td className="p-4">{new Date(sale.date).toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        sale.type === 'Sale' ? 'bg-green-100 text-green-800' :
                                        sale.type === 'Refund' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {sale.type}
                                    </span>
                                </td>
                                <td className="p-4">{sale.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                                <td className="p-4">${sale.total.toFixed(2)}</td>
                                <td className="p-4">{sale.paymentMethod}</td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <button onClick={() => openReceiptModal(sale)} className="text-sm px-3 py-1 bg-gray-200 rounded-md">View Receipt</button>
                                        {sale.type === 'Sale' && (
                                            <>
                                                <button onClick={() => openRefundModal(sale)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" title="Refund"><ArrowUturnLeftIcon className="w-5 h-5"/></button>
                                                <button onClick={() => openVoidModal(sale)} className="p-2 text-danger hover:bg-danger/10 rounded-full" title="Void"><NoSymbolIcon className="w-5 h-5"/></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isRefundModalOpen && selectedSale && <RefundModal sale={selectedSale} onClose={() => setIsRefundModalOpen(false)} setSales={setSales} products={products} setProducts={setProducts} logActivity={logActivity} />}
            {isVoidModalOpen && selectedSale && <VoidSaleModal sale={selectedSale} onClose={() => setIsVoidModalOpen(false)} setSales={setSales} products={products} setProducts={setProducts} logActivity={logActivity} />}
            {isReceiptModalOpen && selectedSale && <ReceiptModal sale={selectedSale} onClose={() => setIsReceiptModalOpen(false)} />}
        </div>
    );
};

export default SalesHistoryView;
