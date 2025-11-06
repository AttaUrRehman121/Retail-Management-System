
import React, { useState } from 'react';
import { PurchaseOrder, Supplier, Product } from '../../types';
import PurchaseOrderFormModal from './PurchaseOrderFormModal';
import SupplierFormModal from './SupplierFormModal';
import ReceiveStockModal from './ReceiveStockModal';
import { PlusIcon } from '../icons/icons';

interface PurchaseViewProps {
    purchaseOrders: PurchaseOrder[];
    setPurchaseOrders: React.Dispatch<React.SetStateAction<PurchaseOrder[]>>;
    suppliers: Supplier[];
    setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    logActivity: (action: string) => void;
}

const PurchaseView: React.FC<PurchaseViewProps> = ({ purchaseOrders, setPurchaseOrders, suppliers, setSuppliers, products, setProducts, logActivity }) => {
    const [isPOModalOpen, setIsPOModalOpen] = useState(false);
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

    const getSupplierName = (supplierId: string) => {
        return suppliers.find(s => s.id === supplierId)?.name || 'N/A';
    };
    
    const handleReceiveStock = (po: PurchaseOrder) => {
        setSelectedPO(po);
        setIsReceiveModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Purchases</h1>
                <div className="flex space-x-2">
                    <button onClick={() => setIsSupplierModalOpen(true)} className="px-4 py-2 bg-secondary text-white rounded-lg">Manage Suppliers</button>
                    <button onClick={() => setIsPOModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg">
                        <PlusIcon className="w-5 h-5"/>
                        <span>New Purchase Order</span>
                    </button>
                </div>
            </div>

             <div className="bg-surface rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">PO ID</th>
                            <th className="p-4">Supplier</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrders.map(po => (
                            <tr key={po.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm">{po.id}</td>
                                <td className="p-4">{getSupplierName(po.supplierId)}</td>
                                <td className="p-4">{new Date(po.date).toLocaleDateString()}</td>
                                <td className="p-4">${po.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        po.status === 'Received' ? 'bg-green-100 text-green-800' :
                                        po.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {po.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {po.status === 'Pending' && (
                                        <button onClick={() => handleReceiveStock(po)} className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md">Receive Stock</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPOModalOpen && <PurchaseOrderFormModal onClose={() => setIsPOModalOpen(false)} suppliers={suppliers} products={products} setPurchaseOrders={setPurchaseOrders} logActivity={logActivity} />}
            {isSupplierModalOpen && <SupplierFormModal onClose={() => setIsSupplierModalOpen(false)} setSuppliers={setSuppliers} logActivity={logActivity} />}
            {isReceiveModalOpen && selectedPO && <ReceiveStockModal purchaseOrder={selectedPO} onClose={() => setIsReceiveModalOpen(false)} setPurchaseOrders={setPurchaseOrders} setProducts={setProducts} logActivity={logActivity} />}
        </div>
    );
};

export default PurchaseView;
