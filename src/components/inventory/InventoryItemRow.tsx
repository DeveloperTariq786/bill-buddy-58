import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, Supplier, Unit, InventoryItem } from '@/types/inventory';
import { cn } from '@/lib/utils';

interface InventoryItemRowProps {
  item: InventoryItem;
  index: number;
  products: Product[];
  suppliers: Supplier[];
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
  onRemove: (id: string) => void;
}

const InventoryItemRow = ({
  item,
  index,
  products,
  suppliers,
  onUpdate,
  onRemove,
}: InventoryItemRowProps) => {
  const selectedProduct = products.find(p => p.id === item.productId);
  const availableUnits = selectedProduct?.units || [];
  const lineTotal = item.quantity * item.price;

  return (
    <tr className={cn(
      "border-b border-table-border transition-colors animate-fade-in",
      "hover:bg-table-row-hover"
    )}>
      {/* Row Number */}
      <td className="px-4 py-3">
        <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
          {index + 1}
        </span>
      </td>

      {/* Product */}
      <td className="px-4 py-3">
        <Select
          value={item.productId}
          onValueChange={(value) => {
            const product = products.find(p => p.id === value);
            onUpdate(item.id, { 
              productId: value, 
              unitId: product?.units[0]?.id || '' 
            });
          }}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-xs text-muted-foreground">{product.sku}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      {/* Unit */}
      <td className="px-4 py-3">
        <Select
          value={item.unitId}
          onValueChange={(value) => onUpdate(item.id, { unitId: value })}
          disabled={!item.productId}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {availableUnits.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name} ({unit.abbreviation})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      {/* Quantity */}
      <td className="px-4 py-3">
        <Input
          type="number"
          min="1"
          value={item.quantity || ''}
          onChange={(e) => onUpdate(item.id, { quantity: parseInt(e.target.value) || 0 })}
          className="w-24 bg-background text-center"
          placeholder="0"
        />
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={item.price || ''}
            onChange={(e) => onUpdate(item.id, { price: parseFloat(e.target.value) || 0 })}
            className="w-28 bg-background pl-7"
            placeholder="0.00"
          />
        </div>
      </td>

      {/* Supplier */}
      <td className="px-4 py-3">
        <Select
          value={item.supplierId}
          onValueChange={(value) => onUpdate(item.id, { supplierId: value })}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select supplier" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      {/* Line Total */}
      <td className="px-4 py-3">
        <span className="font-semibold text-foreground">
          ${lineTotal.toFixed(2)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};

export default InventoryItemRow;
