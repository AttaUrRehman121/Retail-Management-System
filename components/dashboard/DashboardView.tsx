import React from 'react';
import { Sale, Product } from '../../types';
import StatCard from './StatCard';
import { ShoppingCartIcon, ArchiveBoxIcon, ChartBarIcon } from '../icons/icons';

interface DashboardViewProps {
    sales: Sale[];
    products: Product[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ sales, products }) => {
    const todaySales = sales.filter(s => new Date(s.date).toDateString() === new Date().toDateString());
    const totalRevenue = todaySales.reduce((acc, sale) => acc + sale.total, 0);
    const totalTransactions = todaySales.filter(s => s.type === 'Sale').length;
    const lowStockProducts = products.filter(p => p.stock <= (p.reorderPoint || 0));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Today's Revenue" 
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={<ChartBarIcon className="w-6 h-6" />} 
                />
                 <StatCard 
                    title="Today's Transactions" 
                    value={totalTransactions.toString()}
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />
                 <StatCard 
                    title="Low Stock Items" 
                    value={lowStockProducts.length.toString()}
                    icon={<ArchiveBoxIcon className="w-6 h-6" />}
                />
            </div>

            {lowStockProducts.length > 0 && (
                <div className="bg-surface p-6 rounded-xl shadow-sm border border-yellow-300">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-800">Low Stock Alerts</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Current Stock</th>
                                    <th className="p-4">Reorder Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStockProducts.map(product => (
                                    <tr key={product.id} className="border-b hover:bg-yellow-50">
                                        <td className="p-4 font-semibold">{product.name}</td>
                                        <td className="p-4 font-bold text-danger">{product.stock}</td>
                                        <td className="p-4">{product.reorderPoint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardView;
