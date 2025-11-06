
import React, { useState, useMemo } from 'react';
import { CartItem, Sale } from '../../types';
import { TrashIcon, PencilIcon } from '../icons/icons';
import CheckoutModal from './CheckoutModal';
import ReceiptModal from './ReceiptModal';
import ItemDiscountModal from './ItemDiscountModal';

interface CartProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    onCheckout: (sale: Sale) => void;
}

const Cart: React.FC<CartProps> = ({ cart, setCart, onCheckout }) => {
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [completedSale, setCompletedSale] = useState<Sale | null>(null);
    const [itemToDiscount, setItemToDiscount] = useState<CartItem | null>(null);

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } else {
            setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
        }
    };

    const removeItem = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const applyDiscount = (itemId: string, discount: number) => {
        setCart(prevCart => prevCart.map(item => item.id === itemId ? { ...item, discount } : item));
        setItemToDiscount(null);
    };

    const { subtotal, tax, total } = useMemo(() => {
        const subtotal = cart.reduce((acc, item) => {
            const itemTotal = item.price * item.quantity;
            const discountAmount = item.discount ? (itemTotal * item.discount) / 100 : 0;
            return acc + (itemTotal - discountAmount);
        }, 0);
        const tax = subtotal * 0.08; // 8% tax rate
        const total = subtotal + tax;
        return { subtotal, tax, total };
    }, [cart]);

    const handleFinalizeSale = (paymentMethod: 'Cash' | 'Card') => {
        const newSale: Sale = {
            id: `SALE-${Date.now()}`,
            date: new Date().toISOString(),
            items: cart,
            subtotal,
            tax,
            total,
            paymentMethod,
            type: 'Sale'
        };
        onCheckout(newSale);
        setIsCheckoutModalOpen(false);
        setCompletedSale(newSale);
        setCart([]);
    };

    const handleNewSale = () => {
        setCompletedSale(null);
    };

    return (
        <div className="bg-surface rounded-lg p-4 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Current Sale</h2>
            <div className="flex-grow overflow-y-auto -mx-4 px-4">
                {cart.length === 0 ? (
                    <p className="text-center text-on-surface-variant">Cart is empty</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {cart.map(item => (
                            <li key={item.id} className="py-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-on-surface-variant">${item.price.toFixed(2)}</p>
                                        {item.discount && <p className="text-sm text-green-600">-{item.discount}% discount</p>}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                         <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} className="w-16 text-center border rounded-md" />
                                        <button onClick={() => setItemToDiscount(item)} className="p-1 text-gray-500 hover:text-primary"><PencilIcon className="w-4 h-4" /></button>
                                        <button onClick={() => removeItem(item.id)} className="p-1 text-gray-500 hover:text-danger"><TrashIcon className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {cart.length > 0 && (
                <div className="border-t mt-4 pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-xl"><span>Total</span><span>${total.toFixed(2)}</span></div>
                    </div>
                    <button onClick={() => setIsCheckoutModalOpen(true)} className="mt-4 w-full bg-primary text-white p-4 rounded-lg font-bold">
                        Checkout
                    </button>
                </div>
            )}
             {isCheckoutModalOpen && <CheckoutModal total={total} onClose={() => setIsCheckoutModalOpen(false)} onFinalize={handleFinalizeSale} />}
             {completedSale && <ReceiptModal sale={completedSale} onClose={handleNewSale} />}
             {itemToDiscount && <ItemDiscountModal item={itemToDiscount} onApply={applyDiscount} onClose={() => setItemToDiscount(null)} />}
        </div>
    );
};

export default Cart;
