export interface Product {
  id: string;
  name: string;
  sku: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  unitId: string;
  quantity: number;
  price: number;
  supplierId: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  date: Date;
  items: BillItem[];
  grandTotal: number;
  status: 'draft' | 'saved' | 'completed';
}

export interface BillItem {
  id: string;
  productId: string;
  productName: string;
  unitId: string;
  unitName: string;
  quantity: number;
  price: number;
  total: number;
  supplierId: string;
  supplierName: string;
}

export interface StockEntry {
  id: string;
  productId: string;
  unitId: string;
  supplierId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  billId: string;
  createdAt: Date;
}
