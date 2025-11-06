
import React, { useState } from 'react';
import { Product, Category, CartItem, Sale, HeldSale } from '../../types';
import ProductGrid from './ProductGrid';
import Cart from './Cart';
import HeldSalesModal from './HeldSalesModal';
import { PauseIcon, ArrowDownTrayIcon } from '../icons/icons';


interface POSViewProps {
    products: Product[];
    categories: Category[];
    onCheckout: (sale: Sale) => void;
}

const POSView: React.FC<POSViewProps> = ({ products, categories, onCheckout }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [heldSales, setHeldSales] = useState<HeldSale[]>([]);
    const [isHeldSalesModalOpen, setIsHeldSalesModalOpen] = useState(false);
    
    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleHoldSale = () => {
        if (cart.length === 0) return;
        const holdName = prompt("Enter a name for this held sale (optional):") || `Held at ${new Date().toLocaleTimeString()}`;
        const newHeldSale: HeldSale = {
            id: `HELD-${Date.now()}`,
            name: holdName,
            cart: cart,
            timestamp: Date.now()
        };
        setHeldSales(prev => [...prev, newHeldSale]);
        setCart([]);
    };

    const handleRestoreSale = (saleId: string) => {
        const saleToRestore = heldSales.find(s => s.id === saleId);
        if (saleToRestore) {
            if (cart.length > 0 && !window.confirm("This will replace the current cart. Continue?")) {
                return;
            }
            setCart(saleToRestore.cart);
            setHeldSales(prev => prev.filter(s => s.id !== saleId));
            setIsHeldSalesModalOpen(false);
        }
    };
    
    const handleDeleteHeldSale = (saleId: string) => {
        setHeldSales(prev => prev.filter(s => s.id !== saleId));
    };

    return (
        <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-7">
                <ProductGrid products={products} categories={categories} onAddToCart={handleAddToCart} />
            </div>
            <div className="col-span-5 h-full flex flex-col">
                 <div className="flex space-x-2 mb-4">
                    <button onClick={handleHoldSale} disabled={cart.length === 0} className="flex-1 flex items-center justify-center space-x-2 p-3 bg-yellow-500 text-white rounded-lg disabled:opacity-50">
                        <PauseIcon className="w-5 h-5" />
                        <span>Hold Sale</span>
                    </button>
                    <button onClick={() => setIsHeldSalesModalOpen(true)} className="flex-1 flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span>View Held ({heldSales.length})</span>
                    </button>
                </div>
                <div className="flex-grow">
                     <Cart cart={cart} setCart={setCart} onCheckout={onCheckout} />
                </div>
            </div>
            {isHeldSalesModalOpen && <HeldSalesModal heldSales={heldSales} onClose={() => setIsHeldSalesModalOpen(false)} onRestore={handleRestoreSale} onDelete={handleDeleteHeldSale} />}
        </div>
    );
};

export default POSView;
