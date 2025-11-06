import { Product, Category, Customer, Supplier, PurchaseOrder, Sale, Promotion, ActivityLog, StockLedgerEntry, Role } from '../types';

export const mockCategories: Category[] = [
    { id: 'cat-1', name: 'Coffee' },
    { id: 'cat-2', name: 'Tea' },
    { id: 'cat-3', name: 'Pastries' },
    { id: 'cat-4', name: 'Sandwiches' },
    { id: 'cat-5', name: 'Merchandise' },
];

export const mockProducts: Product[] = [
    { id: 'prod-1', name: 'Espresso', price: 2.50, categoryId: 'cat-1', stock: 100, cost: 0.50, reorderPoint: 20 },
    { id: 'prod-2', name: 'Latte', price: 3.50, categoryId: 'cat-1', stock: 100, cost: 0.75, reorderPoint: 20 },
    { id: 'prod-3', name: 'Cappuccino', price: 3.50, categoryId: 'cat-1', stock: 100, cost: 0.75, reorderPoint: 20 },
    { id: 'prod-4', name: 'Green Tea', price: 2.75, categoryId: 'cat-2', stock: 50, cost: 0.60, reorderPoint: 15 },
    { id: 'prod-5', name: 'Black Tea', price: 2.50, categoryId: 'cat-2', stock: 50, cost: 0.55, reorderPoint: 15 },
    { id: 'prod-6', name: 'Croissant', price: 2.25, categoryId: 'cat-3', stock: 30, cost: 1.00, reorderPoint: 10 },
    { id: 'prod-7', name: 'Muffin', price: 2.00, categoryId: 'cat-3', stock: 40, cost: 0.90, reorderPoint: 10 },
    { id: 'prod-8', name: 'Turkey Sandwich', price: 6.50, categoryId: 'cat-4', stock: 15, cost: 3.00, reorderPoint: 10 },
    { id: 'prod-9', name: 'Veggie Sandwich', price: 6.00, categoryId: 'cat-4', stock: 8, cost: 2.50, reorderPoint: 10 },
    { id: 'prod-10', name: 'T-Shirt', price: 15.00, categoryId: 'cat-5', stock: 25, cost: 7.00, reorderPoint: 5 },
    { id: 'prod-11', name: 'Mug', price: 8.00, categoryId: 'cat-5', stock: 4, cost: 3.50, reorderPoint: 5 },
];

export const mockSales: Sale[] = [
    { 
        id: 'SALE-1', 
        date: new Date(Date.now() - 86400000).toISOString(), 
        items: [{ ...mockProducts[1], quantity: 1 }, { ...mockProducts[5], quantity: 1 }], 
        subtotal: 6.00,
        tax: 0.48,
        total: 6.48, 
        paymentMethod: 'Card',
        type: 'Sale'
    },
    { 
        id: 'SALE-2', 
        date: new Date().toISOString(), 
        items: [{ ...mockProducts[7], quantity: 2 }],
        subtotal: 13.00,
        tax: 1.04,
        total: 14.04, 
        paymentMethod: 'Cash',
        type: 'Sale'
    },
];

export const mockCustomers: Customer[] = [
    { id: 'cust-1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', purchaseHistory: ['SALE-1'] },
    { id: 'cust-2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', address: '456 Oak Ave', purchaseHistory: [] },
];

export const mockSuppliers: Supplier[] = [
    { id: 'sup-1', name: 'Coffee Beans Inc.', contactPerson: 'Bob', phone: '555-1111', email: 'bob@coffee.com' },
    { id: 'sup-2', name: 'Bakery Goods Co.', contactPerson: 'Sue', phone: '555-2222', email: 'sue@bakery.com' },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
    { id: 'PO-1', supplierId: 'sup-1', date: new Date().toISOString(), items: [{ productId: 'prod-1', quantity: 50, cost: 1.00 }], total: 50.00, status: 'Received' },
    { id: 'PO-2', supplierId: 'sup-2', date: new Date().toISOString(), items: [{ productId: 'prod-6', quantity: 20, cost: 0.75 }], total: 15.00, status: 'Pending' },
];

export const mockPromotions: Promotion[] = [
    { id: 'PROMO-1', name: '10% Off Coffee', type: 'percentage', value: 10, applicableCategoryIds: ['cat-1'] },
    { id: 'PROMO-2', name: '$5 Off T-Shirts', type: 'fixed', value: 5, applicableProductIds: ['prod-10'] },
];

// FIX: Use Role enum instead of string literals for user property.
export const mockActivityLog: ActivityLog[] = [
    { id: 'log-1', date: new Date().toISOString(), user: Role.Manager, action: 'Logged in' },
    { id: 'log-2', date: new Date().toISOString(), user: Role.Cashier, action: 'Processed sale #SALE-2' },
];

export const mockStockLedger: StockLedgerEntry[] = [
    { id: 'sledger-1', productId: 'prod-1', date: new Date().toISOString(), change: 50, newStock: 100, reason: 'Purchase Order #PO-1' },
    { id: 'sledger-2', productId: 'prod-2', date: new Date().toISOString(), change: -1, newStock: 99, reason: 'Sale #SALE-1' },
];