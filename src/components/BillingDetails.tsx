import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const BillingDetails = () => {
  // Example dates - these would come from your API
  const cutoffDate = "January 25, 2025";
  const paymentDeadline = "February 1, 2025";
  const billingCycleEnd = "February 28, 2025";

  return (
    <Card className="bg-card border-border/30 shadow-sm max-w-md mx-auto p-8">
      <h2 className="text-xl font-medium text-card-foreground mb-8">Billing Details</h2>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center py-4 border-b border-border/20">
          <span className="text-sm text-muted-foreground font-normal">Cutoff date</span>
          <span className="text-base text-foreground font-semibold">{cutoffDate}</span>
        </div>
        
        <div className="flex justify-between items-center py-4 border-b border-border/20">
          <span className="text-sm text-muted-foreground font-normal">Payment deadline</span>
          <span className="text-base text-foreground font-semibold">{paymentDeadline}</span>
        </div>
        
        <div className="flex justify-between items-center py-4 border-b border-border/20">
          <span className="text-sm text-muted-foreground font-normal">End of billing cycle</span>
          <span className="text-base text-foreground font-semibold">{billingCycleEnd}</span>
        </div>
      </div>

      <Button 
        variant="fintech"
        className="w-full mt-8"
      >
        Pay in advance
      </Button>
    </Card>
  );
};
