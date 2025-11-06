
import React, { useState } from 'react';
import { CartItem } from '../../types';
import Modal from '../common/Modal';

interface ItemDiscountModalProps {
    item: CartItem;
    onClose: () => void;
    onApply: (itemId: string, discount: number) => void;
}

const ItemDiscountModal: React.FC<ItemDiscountModalProps> = ({ item, onClose, onApply }) => {
    const [discount, setDiscount] = useState(item.discount || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApply(item.id, discount);
    };

    return (
        <Modal title={`Discount for ${item.name}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="discount" className="block text-sm font-medium">Discount Percentage (%)</label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                        className="w-full mt-1 p-2 border rounded-md"
                        min="0"
                        max="100"
                    />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Apply Discount</button>
                </div>
            </form>
        </Modal>
    );
};

export default ItemDiscountModal;
