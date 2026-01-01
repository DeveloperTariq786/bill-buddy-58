import { useState } from 'react';
import { Package } from 'lucide-react';
import AddInventoryForm from '@/components/inventory/AddInventoryForm';
import BillSummary from '@/components/inventory/BillSummary';
import RecentBills from '@/components/inventory/RecentBills';
import { Bill } from '@/types/inventory';

const Index = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);
  const [showBillSummary, setShowBillSummary] = useState(false);

  const handleBillCreated = (bill: Bill) => {
    setBills([bill, ...bills]);
    setCurrentBill(bill);
    setShowBillSummary(true);
  };

  const handleViewBill = (bill: Bill) => {
    setCurrentBill(bill);
    setShowBillSummary(true);
  };

  const handleBackFromSummary = () => {
    setShowBillSummary(false);
    setCurrentBill(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">InvenTrack</h1>
            <p className="text-sm text-muted-foreground">Add Inventory</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        {showBillSummary && currentBill ? (
          <BillSummary bill={currentBill} onBack={handleBackFromSummary} />
        ) : (
          <>
            <AddInventoryForm onBillCreated={handleBillCreated} />
            <RecentBills bills={bills} onViewBill={handleViewBill} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
