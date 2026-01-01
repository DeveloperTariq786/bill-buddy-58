import { format } from 'date-fns';
import { Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bill } from '@/types/inventory';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecentBillsProps {
  bills: Bill[];
  onViewBill: (bill: Bill) => void;
}

const RecentBills = ({ bills, onViewBill }: RecentBillsProps) => {
  if (bills.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-card mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bills</CardTitle>
        <Badge variant="secondary">{bills.length} bill{bills.length !== 1 ? 's' : ''}</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Bill #</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Items</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b border-border hover:bg-table-row-hover transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{bill.billNumber}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {format(bill.date, 'MMM dd, yyyy • hh:mm a')}
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground">{bill.items.length} item{bill.items.length !== 1 ? 's' : ''}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">${bill.grandTotal.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    Completed
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => onViewBill(bill)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RecentBills;
