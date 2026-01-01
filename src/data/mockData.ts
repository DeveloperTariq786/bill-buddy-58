import { Product, Supplier, Unit } from '@/types/inventory';

export const mockUnits: Unit[] = [
  { id: 'unit-1', name: 'Pieces', abbreviation: 'pcs' },
  { id: 'unit-2', name: 'Kilograms', abbreviation: 'kg' },
  { id: 'unit-3', name: 'Liters', abbreviation: 'L' },
  { id: 'unit-4', name: 'Boxes', abbreviation: 'box' },
  { id: 'unit-5', name: 'Meters', abbreviation: 'm' },
];

export const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Laptop Dell XPS 15', sku: 'DELL-XPS-15', units: [mockUnits[0], mockUnits[3]] },
  { id: 'prod-2', name: 'Wireless Mouse Logitech', sku: 'LOG-MX-M', units: [mockUnits[0], mockUnits[3]] },
  { id: 'prod-3', name: 'USB-C Cable 2m', sku: 'USB-C-2M', units: [mockUnits[0], mockUnits[3]] },
  { id: 'prod-4', name: 'Office Chair Ergonomic', sku: 'CHAIR-ERG-01', units: [mockUnits[0]] },
  { id: 'prod-5', name: 'Monitor Stand Adjustable', sku: 'MON-STD-ADJ', units: [mockUnits[0], mockUnits[3]] },
  { id: 'prod-6', name: 'Cleaning Solution', sku: 'CLEAN-SOL', units: [mockUnits[2], mockUnits[3]] },
  { id: 'prod-7', name: 'Network Cable Cat6', sku: 'NET-CAT6', units: [mockUnits[4], mockUnits[3]] },
  { id: 'prod-8', name: 'Keyboard Mechanical', sku: 'KB-MECH-01', units: [mockUnits[0], mockUnits[3]] },
];

export const mockSuppliers: Supplier[] = [
  { id: 'sup-1', name: 'TechWorld Distributors', contact: 'sales@techworld.com' },
  { id: 'sup-2', name: 'Office Supplies Co.', contact: 'orders@officesupplies.com' },
  { id: 'sup-3', name: 'Global Electronics', contact: 'procurement@globalelec.com' },
  { id: 'sup-4', name: 'Premium Parts Ltd.', contact: 'info@premiumparts.com' },
  { id: 'sup-5', name: 'Rapid Wholesale', contact: 'wholesale@rapid.com' },
];

export const generateBillNumber = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `INV-${year}-${random}`;
};
