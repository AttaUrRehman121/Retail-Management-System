
import React from 'react';
import { Product } from '../../types';
import Modal from '../common/Modal';

interface VariantSelectionModalProps {
    product: Product;
    onClose: () => void;
    onSelect: (product: Product) => void;
}

const VariantSelectionModal: React.FC<VariantSelectionModalProps> = ({ product, onClose, onSelect }) => {
    if (!product.variants || product.variants.length === 0) {
        onSelect(product);
        return null;
    }

    return (
        <Modal title={`Select Options for ${product.name}`} onClose={onClose}>
            <div className="space-y-4">
                {product.variants.map(variant => (
                    <div key={variant.id}>
                        <label className="block text-sm font-medium">{variant.name}</label>
                        <div className="flex space-x-2 mt-1">
                            {variant.options.map(option => (
                                <button key={option} className="px-4 py-2 border rounded-lg hover:bg-gray-100">{option}</button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end pt-4">
                    <button onClick={() => onSelect(product)} className="px-4 py-2 bg-primary text-white rounded-lg">Add to Cart</button>
                </div>
            </div>
        </Modal>
    );
};

export default VariantSelectionModal;
