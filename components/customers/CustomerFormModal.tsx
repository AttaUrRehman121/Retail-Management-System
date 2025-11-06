
import React, { useState, useEffect } from 'react';
import { Customer } from '../../types';
import Modal from '../common/Modal';

interface CustomerFormModalProps {
    customer: Customer | null;
    onClose: () => void;
    onSave: (customer: Customer) => void;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ customer, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Customer, 'id' | 'purchaseHistory'>>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
            });
        }
    }, [customer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const customerToSave = customer ? { ...customer, ...formData } : { ...formData, id: '' };
        onSave(customerToSave);
    };

    return (
        <Modal title={customer ? 'Edit Customer' : 'New Customer'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium">Address</label>
                    <textarea name="address" id="address" value={formData.address} onChange={handleChange} rows={3} className="w-full mt-1 p-2 border rounded-md"></textarea>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Customer</button>
                </div>
            </form>
        </Modal>
    );
};

export default CustomerFormModal;
