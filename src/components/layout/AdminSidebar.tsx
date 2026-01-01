import { 
  Package, 
  ShoppingCart, 
  FileText, 
  LayoutDashboard,
  Settings,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ icon, label, active, onClick }: SidebarLinkProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2",
      active 
        ? "bg-sidebar-active text-sidebar-primary-foreground" 
        : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const AdminSidebar = ({ currentPage, onNavigate }: AdminSidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-active flex items-center justify-center">
            <Package className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">InvenTrack</h1>
            <p className="text-xs text-sidebar-muted">Inventory Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        <SidebarLink 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
        <SidebarLink 
          icon={<ShoppingCart className="w-5 h-5" />} 
          label="Add Inventory" 
          active={currentPage === 'add-inventory'}
          onClick={() => onNavigate('add-inventory')}
        />
        <SidebarLink 
          icon={<Package className="w-5 h-5" />} 
          label="Stock List" 
          active={currentPage === 'stock'}
          onClick={() => onNavigate('stock')}
        />
        <SidebarLink 
          icon={<FileText className="w-5 h-5" />} 
          label="Bills" 
          active={currentPage === 'bills'}
          onClick={() => onNavigate('bills')}
        />
        <SidebarLink 
          icon={<Users className="w-5 h-5" />} 
          label="Suppliers" 
          active={currentPage === 'suppliers'}
          onClick={() => onNavigate('suppliers')}
        />
        <SidebarLink 
          icon={<TrendingUp className="w-5 h-5" />} 
          label="Reports" 
          active={currentPage === 'reports'}
          onClick={() => onNavigate('reports')}
        />
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border">
        <SidebarLink 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
          active={currentPage === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </div>
    </aside>
  );
};

export default AdminSidebar;
