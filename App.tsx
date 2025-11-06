
import React, { useState, useCallback, useMemo } from 'react';
import { Role, Product, Category, Sale, Customer, Supplier, PurchaseOrder, Promotion, ActivityLog, StockLedgerEntry } from './types';
import { mockProducts, mockCategories, mockSales, mockCustomers, mockSuppliers, mockPurchaseOrders, mockPromotions, mockActivityLog, mockStockLedger } from './utils/mockData';

import Header from './components/Header';
import POSView from './components/pos/POSView';
import DashboardView from './components/dashboard/DashboardView';
import InventoryView from './components/inventory/InventoryView';
import SalesHistoryView from './components/sales/SalesHistoryView';
import CustomerView from './components/customers/CustomerView';
import PurchaseView from './components/purchases/PurchaseView';
import ReportsView from './components/reports/ReportsView';
import SettingsView from './components/settings/SettingsView';
import ActivityLogView from './components/activity/ActivityLogView';
import { ChartBarIcon, ShoppingCartIcon, ArchiveBoxIcon, UsersIcon, TruckIcon, CogIcon, DocumentReportIcon, ClipboardDocumentListIcon, BanknotesIcon } from './components/icons/icons';

type View = 'dashboard' | 'pos' | 'inventory' | 'sales' | 'customers' | 'purchases' | 'reports' | 'settings' | 'activity';

const App: React.FC = () => {
    const [currentRole, setCurrentRole] = useState<Role>(Role.Cashier);
    const [activeView, setActiveView] = useState<View>('dashboard');

    // State management
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [sales, setSales] = useState<Sale[]>(mockSales);
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
    const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
    const [activityLog, setActivityLog] = useState<ActivityLog[]>(mockActivityLog);
    const [stockLedger, setStockLedger] = useState<StockLedgerEntry[]>(mockStockLedger);
    
    const logActivity = useCallback((action: string) => {
        const newLog: ActivityLog = {
            id: `LOG-${Date.now()}`,
            date: new Date().toISOString(),
            user: currentRole,
            action,
        };
        setActivityLog(prev => [newLog, ...prev]);
    }, [currentRole]);


    const handleCheckout = (sale: Sale) => {
        setSales(prev => [sale, ...prev]);
        
        // Update stock
        const newProducts = [...products];
        sale.items.forEach(item => {
            const productIndex = newProducts.findIndex(p => p.id === item.id);
            if (productIndex !== -1) {
                newProducts[productIndex].stock -= item.quantity;
            }
        });
        setProducts(newProducts);
        logActivity(`Processed sale #${sale.id.slice(-6)} for $${sale.total.toFixed(2)}`);
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView sales={sales} products={products} />;
            case 'pos':
                return <POSView products={products} categories={categories} onCheckout={handleCheckout} />;
            case 'inventory':
                return <InventoryView products={products} setProducts={setProducts} categories={categories} setCategories={setCategories} stockLedger={stockLedger} logActivity={logActivity} />;
            case 'sales':
                return <SalesHistoryView sales={sales} setSales={setSales} products={products} setProducts={setProducts} logActivity={logActivity} />;
            case 'customers':
                return <CustomerView customers={customers} setCustomers={setCustomers} />;
            case 'purchases':
                return <PurchaseView purchaseOrders={purchaseOrders} setPurchaseOrders={setPurchaseOrders} suppliers={suppliers} setSuppliers={setSuppliers} products={products} setProducts={setProducts} logActivity={logActivity}/>;
            case 'reports':
                return <ReportsView sales={sales} products={products} />;
            case 'settings':
                return <SettingsView promotions={promotions} setPromotions={setPromotions} logActivity={logActivity} />;
            case 'activity':
                 return <ActivityLogView activityLog={activityLog} />;
            default:
                return <DashboardView sales={sales} products={products} />;
        }
    };
    
    const sidebarItems = useMemo(() => [
        { view: 'dashboard', label: 'Dashboard', icon: ChartBarIcon, roles: [Role.Manager, Role.Cashier] },
        { view: 'pos', label: 'POS', icon: ShoppingCartIcon, roles: [Role.Manager, Role.Cashier] },
        { view: 'inventory', label: 'Inventory', icon: ArchiveBoxIcon, roles: [Role.Manager] },
        { view: 'sales', label: 'Sales History', icon: BanknotesIcon, roles: [Role.Manager] },
        { view: 'customers', label: 'Customers', icon: UsersIcon, roles: [Role.Manager, Role.Cashier] },
        { view: 'purchases', label: 'Purchases', icon: TruckIcon, roles: [Role.Manager] },
        { view: 'reports', label: 'Reports', icon: DocumentReportIcon, roles: [Role.Manager] },
        { view: 'settings', label: 'Settings', icon: CogIcon, roles: [Role.Manager] },
        { view: 'activity', label: 'Activity Log', icon: ClipboardDocumentListIcon, roles: [Role.Manager] },
    ], []);

    const availableViews = useMemo(() => sidebarItems.filter(item => item.roles.includes(currentRole)), [currentRole, sidebarItems]);

    // Inline Sidebar component to avoid creating a new file
    const Sidebar = () => (
        <aside className="w-64 bg-surface flex-shrink-0 border-r border-gray-200 flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-200">
                <h1 className="text-xl font-bold text-primary">POS System</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {availableViews.map(item => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.view}
                            onClick={() => setActiveView(item.view)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left ${activeView === item.view ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-on-surface">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
