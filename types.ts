// FIX: Provided full content for the types file.
export enum Role {
    Manager = 'Manager',
    Cashier = 'Cashier',
}

export interface Category {
    id: string;
    name: string;
}

export interface ProductVariant {
    id: string;
    name: string; // e.g., 'Size'
    options: string[]; // e.g., ['Small', 'Medium', 'Large']
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    stock: number;
    sku?: string;
    description?: string;
    cost?: number;
    reorderPoint?: number;
    variants?: ProductVariant[];
}

export interface CartItem extends Product {
    quantity: number;
    discount?: number; // percentage
}

export interface Sale {
    id: string;
    date: string; // ISO string
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'Cash' | 'Card';
    type: 'Sale' | 'Refund' | 'Void';
}

export interface HeldSale {
    id: string;
    name: string;
    cart: CartItem[];
    timestamp: number;
}


export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    purchaseHistory?: string[]; // array of sale IDs
}

export interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
}

export interface PurchaseOrderItem {
    productId: string;
    quantity: number;
    cost: number;
}

export interface PurchaseOrder {
    id: string;
    supplierId: string;
    date: string; // ISO string
    items: PurchaseOrderItem[];
    total: number;
    status: 'Pending' | 'Received' | 'Cancelled';
}

export interface Promotion {
    id: string;
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    applicableProductIds?: string[];
    applicableCategoryIds?: string[];
}

export interface Shift {
    id: string;
    startTime: string; // ISO string
    endTime?: string; // ISO string
    startCash: number;
    endCash?: number;
    salesTotal: number;
    refundsTotal: number;
    cashPayments: number;
    cardPayments: number;
    cashAdded: number;
    cashRemoved: number;
}

export interface ActivityLog {
    id: string;
    date: string; // ISO string
    user: Role;
    action: string;
}

export interface StockLedgerEntry {
    id: string;
    productId: string;
    date: string; // ISO string
    change: number; // positive for addition, negative for subtraction
    newStock: number;
    reason: string; // e.g., 'Sale #123', 'Stock Adjustment', 'Purchase Order #456'
}
