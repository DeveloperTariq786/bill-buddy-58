import { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import AddInventoryForm from '@/components/inventory/AddInventoryForm';
import BillSummary from '@/components/inventory/BillSummary';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentBills from '@/components/dashboard/RecentBills';
import { Bill } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
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
    setCurrentPage('add-inventory');
  };

  const handleBackFromSummary = () => {
    setShowBillSummary(false);
    setCurrentBill(null);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Overview of your inventory system' };
      case 'add-inventory':
        return { title: 'Add Inventory', subtitle: 'Create a new purchase bill' };
      case 'stock':
        return { title: 'Stock List', subtitle: 'View all inventory items' };
      case 'bills':
        return { title: 'Bills', subtitle: 'View all purchase bills' };
      case 'suppliers':
        return { title: 'Suppliers', subtitle: 'Manage your suppliers' };
      case 'reports':
        return { title: 'Reports', subtitle: 'Analytics and insights' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Configure your system' };
      default:
        return { title: 'Dashboard', subtitle: '' };
    }
  };

  const pageInfo = getPageTitle();

  const renderContent = () => {
    if (currentPage === 'add-inventory') {
      if (showBillSummary && currentBill) {
        return <BillSummary bill={currentBill} onBack={handleBackFromSummary} />;
      }
      return <AddInventoryForm onBillCreated={handleBillCreated} />;
    }

    if (currentPage === 'dashboard') {
      return (
        <div className="space-y-8">
          <DashboardStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentBills bills={bills} onViewBill={handleViewBill} />
            </div>
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-card rounded-lg shadow-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start gap-2" 
                    onClick={() => setCurrentPage('add-inventory')}
                  >
                    <Plus className="w-4 h-4" />
                    Add New Inventory
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Placeholder for other pages
    return (
      <div className="bg-card rounded-lg shadow-card p-12 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {pageInfo.title}
        </h3>
        <p className="text-muted-foreground">
          This section is coming soon. Use "Add Inventory" to create purchase bills.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="ml-64">
        <AdminHeader title={pageInfo.title} subtitle={pageInfo.subtitle} />
        
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
