import { Package, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => (
  <Card className="shadow-card hover:shadow-elevated transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <p className={cn(
            "text-sm mt-2 font-medium",
            changeType === 'positive' && "text-success",
            changeType === 'negative' && "text-destructive",
            changeType === 'neutral' && "text-muted-foreground"
          )}>
            {change}
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Products"
        value="1,284"
        change="+12% from last month"
        changeType="positive"
        icon={<Package className="w-6 h-6 text-primary" />}
      />
      <StatCard
        title="Total Bills"
        value="342"
        change="+8% from last month"
        changeType="positive"
        icon={<FileText className="w-6 h-6 text-primary" />}
      />
      <StatCard
        title="Inventory Value"
        value="$84,230"
        change="+23% from last month"
        changeType="positive"
        icon={<DollarSign className="w-6 h-6 text-primary" />}
      />
      <StatCard
        title="Monthly Growth"
        value="18.2%"
        change="Above target"
        changeType="positive"
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
      />
    </div>
  );
};

export default DashboardStats;
