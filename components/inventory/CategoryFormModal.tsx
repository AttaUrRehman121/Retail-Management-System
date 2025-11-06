
import React, { useState } from 'react';
import { Category } from '../../types';
import Modal from '../common/Modal';
import { PlusIcon, TrashIcon } from '../icons/icons';

interface CategoryFormModalProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    onClose: () => void;
    logActivity: (action: string) => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ categories, setCategories, onClose, logActivity }) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim() === '') return;
        const newCategory: Category = {
            id: `CAT-${Date.now()}`,
            name: newCategoryName.trim()
        };
        setCategories(prev => [...prev, newCategory]);
        logActivity(`Added category: ${newCategory.name}`);
        setNewCategoryName('');
    };

    const handleDeleteCategory = (id: string) => {
        const categoryToDelete = categories.find(c => c.id === id);
        if (categoryToDelete) {
            setCategories(prev => prev.filter(c => c.id !== id));
            logActivity(`Deleted category: ${categoryToDelete.name}`);
        }
    };

    return (
        <Modal title="Manage Categories" onClose={onClose}>
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="New category name"
                        className="flex-grow p-2 border rounded-md"
                    />
                    <button onClick={handleAddCategory} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg">
                        <PlusIcon className="w-5 h-5"/>
                    </button>
                </div>
                <ul className="divide-y max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                        <li key={cat.id} className="py-2 flex justify-between items-center">
                            <span>{cat.name}</span>
                            <button onClick={() => handleDeleteCategory(cat.id)} className="text-danger p-1 hover:bg-danger/10 rounded-full">
                                <TrashIcon className="w-4 h-4"/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default CategoryFormModal;
