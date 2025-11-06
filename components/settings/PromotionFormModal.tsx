
import React, { useState, useEffect } from 'react';
import { Promotion } from '../../types';
import Modal from '../common/Modal';

interface PromotionFormModalProps {
    promotion: Promotion | null;
    onClose: () => void;
    onSave: (promotion: Promotion) => void;
}

const PromotionFormModal: React.FC<PromotionFormModalProps> = ({ promotion, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Promotion, 'id'>>({
        name: '',
        type: 'percentage',
        value: 0
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                name: promotion.name,
                type: promotion.type,
                value: promotion.value,
                applicableCategoryIds: promotion.applicableCategoryIds,
                applicableProductIds: promotion.applicableProductIds,
            });
        }
    }, [promotion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const promoToSave = promotion ? { ...promotion, ...formData } : { ...formData, id: '' };
        onSave(promoToSave);
    };

    return (
        <Modal title={promotion ? 'Edit Promotion' : 'New Promotion'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name">Promotion Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount ($)</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="value">Value</label>
                        <input type="number" name="value" id="value" value={formData.value} onChange={handleChange} required className="w-full p-2 border rounded" step="0.01" />
                    </div>
                </div>
                {/* Note: UI for selecting applicable products/categories is omitted for brevity */}
                <p className="text-sm text-gray-500">Applicable products/categories can be configured later.</p>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Promotion</button>
                </div>
            </form>
        </Modal>
    );
};

export default PromotionFormModal;
