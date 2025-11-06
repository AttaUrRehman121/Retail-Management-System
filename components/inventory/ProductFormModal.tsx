import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import Modal from '../common/Modal';
import { generateProductDescription } from '../../services/geminiService';
import { SparklesIcon } from '../icons/icons';

interface ProductFormModalProps {
    product: Product | null;
    categories: Category[];
    onClose: () => void;
    onSave: (product: Product) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, categories, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        categoryId: '',
        stock: 0,
        sku: '',
        description: '',
        cost: 0,
        reorderPoint: 0,
    });
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                categoryId: product.categoryId,
                stock: product.stock,
                sku: product.sku || '',
                description: product.description || '',
                cost: product.cost || 0,
                reorderPoint: product.reorderPoint || 0,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numberFields = ['price', 'stock', 'cost', 'reorderPoint'];
        setFormData(prev => ({ ...prev, [name]: numberFields.includes(name) ? parseFloat(value) : value }));
    };

    const handleGenerateDescription = async () => {
        if (!formData.name) {
            alert("Please enter a product name first.");
            return;
        }
        setIsGenerating(true);
        try {
            const description = await generateProductDescription(formData.name);
            setFormData(prev => ({ ...prev, description }));
        } catch (error) {
            console.error("Failed to generate description", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productToSave: Product = product ? { ...product, ...formData } : { ...formData, id: `PROD-${Date.now()}` };
        onSave(productToSave);
    };

    return (
        <Modal title={product ? 'Edit Product' : 'New Product'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="price" className="block text-sm font-medium">Selling Price</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" step="0.01" />
                    </div>
                     <div className="w-1/2">
                        <label htmlFor="cost" className="block text-sm font-medium">Cost Price</label>
                        <input type="number" name="cost" id="cost" value={formData.cost} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" step="0.01" />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="reorderPoint" className="block text-sm font-medium">Reorder Point</label>
                        <input type="number" name="reorderPoint" id="reorderPoint" value={formData.reorderPoint} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="sku" className="block text-sm font-medium">SKU (Stock Keeping Unit)</label>
                    <input type="text" name="sku" id="sku" value={formData.sku} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" placeholder="Auto-generated if left blank" />
                </div>
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium">Category</label>
                    <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
                        <option value="">Select a category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="w-full mt-1 p-2 border rounded-md"></textarea>
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 flex items-center space-x-2 text-sm text-primary disabled:opacity-50">
                        <SparklesIcon className="w-4 h-4"/>
                        <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                    </button>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Product</button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductFormModal;
