
import React from 'react';
import { Sale, Product } from '../../types';
import { exportToCSV } from '../../utils/export';

interface ReportsViewProps {
    sales: Sale[];
    products: Product[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ sales, products }) => {
    
    const handleExportSales = () => {
        const dataToExport = sales.map(s => ({
            ID: s.id,
            Date: new Date(s.date).toLocaleString(),
            Type: s.type,
            Items: s.items.length,
            Total: s.total.toFixed(2),
            Payment: s.paymentMethod,
        }));
        exportToCSV(dataToExport, 'sales_report');
    };
    
    const handleExportInventory = () => {
        const dataToExport = products.map(p => ({
            ID: p.id,
            Name: p.name,
            Stock: p.stock,
            Price: p.price.toFixed(2),
        }));
        exportToCSV(dataToExport, 'inventory_report');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Reports</h1>

            <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Export Data</h2>
                <div className="flex space-x-4">
                    <button onClick={handleExportSales} className="px-4 py-2 bg-primary text-white rounded-lg">Export Sales Report (CSV)</button>
                    <button onClick={handleExportInventory} className="px-4 py-2 bg-secondary text-white rounded-lg">Export Inventory Report (CSV)</button>
                </div>
            </div>
            
            {/* More report widgets can be added here */}
        </div>
    );
};

export default ReportsView;
