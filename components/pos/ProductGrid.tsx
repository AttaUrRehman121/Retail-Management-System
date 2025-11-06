
import React, { useState } from 'react';
import { Product, Category } from '../../types';

interface ProductGridProps {
    products: Product[];
    categories: Category[];
    onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, categories, onAddToCart }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const filteredProducts = selectedCategoryId 
        ? products.filter(p => p.categoryId === selectedCategoryId)
        : products;

    return (
        <div className="flex flex-col h-full bg-surface rounded-lg p-4">
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                <button 
                    onClick={() => setSelectedCategoryId(null)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${!selectedCategoryId ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                {categories.map(category => (
                    <button 
                        key={category.id} 
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${selectedCategoryId === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto">
                {filteredProducts.map(product => (
                    <div 
                        key={product.id} 
                        className="border rounded-lg p-2 flex flex-col items-center text-center cursor-pointer hover:shadow-lg"
                        onClick={() => onAddToCart(product)}
                    >
                        <div className="w-24 h-24 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <span className="text-xs text-gray-500">{product.name}</span>
                        </div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-on-surface-variant">${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
