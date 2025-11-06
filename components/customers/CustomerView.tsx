
import React, { useState } from 'react';
import { Customer } from '../../types';
import CustomerFormModal from './CustomerFormModal';
import { PlusIcon, PencilIcon, TrashIcon } from '../icons/icons';

interface CustomerViewProps {
    customers: Customer[];
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomerView: React.FC<CustomerViewProps> = ({ customers, setCustomers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    
    const handleSaveCustomer = (customer: Customer) => {
        if (selectedCustomer) {
            setCustomers(customers.map(c => c.id === customer.id ? customer : c));
        } else {
            const newCustomer = { ...customer, id: `CUST-${Date.now()}` };
            setCustomers([...customers, newCustomer]);
        }
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Customers</h1>
                <button onClick={() => { setSelectedCustomer(null); setIsModalOpen(true); }} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg">
                    <PlusIcon className="w-5 h-5"/>
                    <span>New Customer</span>
                </button>
            </div>
            <div className="bg-surface rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{customer.name}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">{customer.phone}</td>
                                <td className="p-4">
                                     <div className="flex space-x-2">
                                        <button onClick={() => { setSelectedCustomer(customer); setIsModalOpen(true); }} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full"><PencilIcon className="w-5 h-5"/></button>
                                        <button className="p-2 text-danger hover:bg-danger/10 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <CustomerFormModal customer={selectedCustomer} onClose={() => setIsModalOpen(false)} onSave={handleSaveCustomer} />}
        </div>
    );
};

export default CustomerView;
