import React, { useState } from 'react';
import { Product, Category, StockLedgerEntry } from '../../types';
import ProductFormModal from './ProductFormModal';
import CategoryFormModal from './CategoryFormModal';
import StockAdjustmentModal from './StockAdjustmentModal';
import StockLedgerModal from './StockLedgerModal';
import BarcodeLabelModal from './BarcodeLabelModal';
import { PlusIcon, PencilIcon, TrashIcon, TagIcon, QrCodeIcon, ArrowUturnLeftIcon, ClipboardDocumentListIcon } from '../icons/icons';

interface InventoryViewProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    stockLedger: StockLedgerEntry[];
    logActivity: (action: string) => void;
}

const InventoryView: React.FC<InventoryViewProps> = ({ products, setProducts, categories, setCategories, stockLedger, logActivity }) => {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isStockAdjModalOpen, setIsStockAdjModalOpen] = useState(false);
    const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
    const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || 'N/A';
    };
    
    const handleSaveProduct = (product: Product) => {
        if (selectedProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p));
            logActivity(`Updated product: ${product.name}`);
        } else {
            setProducts([product, ...products]);
            logActivity(`Added new product: ${product.name}`);
        }
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const openProductModal = (product: Product | null) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const openStockAdjModal = (product: Product) => {
        setSelectedProduct(product);
        setIsStockAdjModalOpen(true);
    };

    const openLedgerModal = (product: Product) => {
        setSelectedProduct(product);
        setIsLedgerModalOpen(true);
    };

     const openBarcodeModal = (product: Product) => {
        setSelectedProduct(product);
        setIsBarcodeModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Inventory</h1>
                <div className="flex space-x-2">
                    <button onClick={() => setIsCategoryModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg">
                        <TagIcon className="w-5 h-5"/>
                        <span>Manage Categories</span>
                    </button>
                    <button onClick={() => openProductModal(null)} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg">
                        <PlusIcon className="w-5 h-5"/>
                        <span>New Product</span>
                    </button>
                </div>
            </div>

             <div className="bg-surface rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Cost</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Reorder Pt.</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const isLowStock = product.stock <= (product.reorderPoint || 0);
                            return (
                                <tr key={product.id} className={`border-b hover:bg-gray-50 ${isLowStock ? 'bg-red-50' : ''}`}>
                                    <td className="p-4 font-semibold">{product.name}</td>
                                    <td className="p-4">{getCategoryName(product.categoryId)}</td>
                                    <td className="p-4">${product.price.toFixed(2)}</td>
                                    <td className="p-4">${product.cost?.toFixed(2) || 'N/A'}</td>
                                    <td className={`p-4 font-bold ${isLowStock ? 'text-danger' : ''}`}>{product.stock}</td>
                                    <td className="p-4">{product.reorderPoint || 'N/A'}</td>
                                    <td className="p-4 font-mono text-sm">{product.sku}</td>
                                    <td className="p-4">
                                         <div className="flex space-x-1">
                                            <button onClick={() => openProductModal(product)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" title="Edit"><PencilIcon className="w-5 h-5"/></button>
                                            <button onClick={() => openStockAdjModal(product)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" title="Adjust Stock"><ArrowUturnLeftIcon className="w-5 h-5"/></button>
                                            <button onClick={() => openLedgerModal(product)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" title="Stock Ledger"><ClipboardDocumentListIcon className="w-5 h-5"/></button>
                                            <button onClick={() => openBarcodeModal(product)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" title="Barcode"><QrCodeIcon className="w-5 h-5"/></button>
                                            <button className="p-2 text-danger hover:bg-danger/10 rounded-full" title="Delete"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isProductModalOpen && <ProductFormModal product={selectedProduct} categories={categories} onClose={() => setIsProductModalOpen(false)} onSave={handleSaveProduct} />}
            {isCategoryModalOpen && <CategoryFormModal categories={categories} setCategories={setCategories} onClose={() => setIsCategoryModalOpen(false)} logActivity={logActivity} />}
            {isStockAdjModalOpen && selectedProduct && <StockAdjustmentModal product={selectedProduct} setProducts={setProducts} onClose={() => setIsStockAdjModalOpen(false)} logActivity={logActivity} />}
            {isLedgerModalOpen && selectedProduct && <StockLedgerModal product={selectedProduct} stockLedger={stockLedger} onClose={() => setIsLedgerModalOpen(false)} />}
            {isBarcodeModalOpen && selectedProduct && <BarcodeLabelModal product={selectedProduct} onClose={() => setIsBarcodeModalOpen(false)} />}
        </div>
    );
};

export default InventoryView;
