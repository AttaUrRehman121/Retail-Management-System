
import React, { useState } from 'react';
import { Supplier } from '../../types';
import Modal from '../common/Modal';

interface SupplierFormModalProps {
    onClose: () => void;
    setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
    logActivity: (action: string) => void;
}

const SupplierFormModal: React.FC<SupplierFormModalProps> = ({ onClose, setSuppliers, logActivity }) => {
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSupplier: Supplier = {
            id: `SUP-${Date.now()}`,
            ...formData
        };
        setSuppliers(prev => [...prev, newSupplier]);
        logActivity(`Added new supplier: ${newSupplier.name}`);
        onClose();
    };

    return (
        <Modal title="New Supplier" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Supplier Name" required className="w-full p-2 border rounded" />
                <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Contact Person" required className="w-full p-2 border rounded" />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border rounded" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Supplier</button>
                </div>
            </form>
        </Modal>
    );
};

export default SupplierFormModal;
