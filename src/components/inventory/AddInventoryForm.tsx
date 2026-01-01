import { useState } from 'react';
import { Plus, Save, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InventoryItemRow from './InventoryItemRow';
import { InventoryItem, Bill, BillItem } from '@/types/inventory';
import { mockProducts, mockSuppliers, generateBillNumber } from '@/data/mockData';
import { toast } from 'sonner';

interface AddInventoryFormProps {
  onBillCreated: (bill: Bill) => void;
}

const AddInventoryForm = ({ onBillCreated }: AddInventoryFormProps) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addItem = () => {
    const newItem: InventoryItem = {
      id: `item-${Date.now()}`,
      productId: '',
      unitId: '',
      quantity: 1,
      price: 0,
      supplierId: '',
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const isValidItem = (item: InventoryItem) => {
    return item.productId && item.unitId && item.supplierId && item.quantity > 0 && item.price > 0;
  };

  const allItemsValid = items.length > 0 && items.every(isValidItem);

  const handleSubmit = () => {
    if (!allItemsValid) {
      toast.error('Please fill in all fields for each item');
      return;
    }

    const billItems: BillItem[] = items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId)!;
      const unit = product.units.find(u => u.id === item.unitId)!;
      const supplier = mockSuppliers.find(s => s.id === item.supplierId)!;

      return {
        id: item.id,
        productId: item.productId,
        productName: product.name,
        unitId: item.unitId,
        unitName: unit.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
        supplierId: item.supplierId,
        supplierName: supplier.name,
      };
    });

    const bill: Bill = {
      id: `bill-${Date.now()}`,
      billNumber: generateBillNumber(),
      date: new Date(),
      items: billItems,
      grandTotal,
      status: 'saved',
    };

    toast.success(`Bill ${bill.billNumber} created successfully!`);
    onBillCreated(bill);
    setItems([]);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">New Purchase Bill</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Add items to create a new inventory bill
              </p>
            </div>
          </div>
          <Button onClick={addItem} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No items added yet</h3>
            <p className="text-muted-foreground mb-4">Click "Add Item" to start adding products to this bill</p>
            <Button onClick={addItem} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add First Item
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-table-header text-table-header-foreground">
                    <th className="px-4 py-3 text-left font-semibold text-sm w-12">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm min-w-[200px]">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm w-36">Unit</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm w-28">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm w-32">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm min-w-[180px]">Supplier</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm w-28">Total</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <InventoryItemRow
                      key={item.id}
                      item={item}
                      index={index}
                      products={mockProducts}
                      suppliers={mockSuppliers}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer with totals and submit */}
            <div className="border-t border-border p-6 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {items.length} item{items.length !== 1 ? 's' : ''} added
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Grand Total</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${grandTotal.toFixed(2)}
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="gap-2 px-8"
                    onClick={handleSubmit}
                    disabled={!allItemsValid}
                  >
                    <Save className="w-5 h-5" />
                    Save Bill
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AddInventoryForm;
