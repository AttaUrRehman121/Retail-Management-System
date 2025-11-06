
import React, { useState } from 'react';
import { Supplier, Product, PurchaseOrder, PurchaseOrderItem } from '../../types';
import Modal from '../common/Modal';
import { PlusIcon, TrashIcon } from '../icons/icons';

interface PurchaseOrderFormModalProps {
    onClose: () => void;
    suppliers: Supplier[];
    products: Product[];
    setPurchaseOrders: React.Dispatch<React.SetStateAction<PurchaseOrder[]>>;
    logActivity: (action: string) => void;
}

const PurchaseOrderFormModal: React.FC<PurchaseOrderFormModalProps> = ({ onClose, suppliers, products, setPurchaseOrders, logActivity }) => {
    const [supplierId, setSupplierId] = useState('');
    const [items, setItems] = useState<PurchaseOrderItem[]>([]);
    
    const addItem = () => {
        setItems([...items, { productId: '', quantity: 1, cost: 0 }]);
    };

    const updateItem = (index: number, field: keyof PurchaseOrderItem, value: string | number) => {
        const newItems = [...items];
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        (newItems[index] as any)[field] = field === 'productId' ? value : numValue;
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const total = items.reduce((acc, item) => acc + item.quantity * item.cost, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!supplierId || items.length === 0) return;

        const newPO: PurchaseOrder = {
            id: `PO-${Date.now()}`,
            supplierId,
            date: new Date().toISOString(),
            items,
            total,
            status: 'Pending'
        };

        setPurchaseOrders(prev => [newPO, ...prev]);
        logActivity(`Created new Purchase Order ${newPO.id}`);
        onClose();
    };

    return (
        <Modal title="New Purchase Order" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="supplierId" className="block text-sm font-medium">Supplier</label>
                    <select id="supplierId" value={supplierId} onChange={e => setSupplierId(e.target.value)} required className="w-full mt-1 p-2 border rounded-md">
                        <option value="">Select a supplier</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Items</h3>
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded-md">
                            <select value={item.productId} onChange={e => updateItem(index, 'productId', e.target.value)} className="flex-1 p-2 border rounded-md">
                                <option value="">Select product</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} className="w-20 p-2 border rounded-md" />
                            <input type="number" placeholder="Cost" value={item.cost} onChange={e => updateItem(index, 'cost', e.target.value)} step="0.01" className="w-24 p-2 border rounded-md" />
                            <button type="button" onClick={() => removeItem(index)} className="text-danger p-2 hover:bg-danger/10 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="flex items-center space-x-2 text-sm text-primary">
                        <PlusIcon className="w-4 h-4"/><span>Add Item</span>
                    </button>
                </div>

                <div className="text-right font-bold text-xl">
                    Total: ${total.toFixed(2)}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Create PO</button>
                </div>
            </form>
        </Modal>
    );
};

export default PurchaseOrderFormModal;
