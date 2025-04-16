"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type ChangeDeliveryStatesProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  bulkStatus: string;
  setBulkStatus: (status: string) => void;
  handleBulkUpdate: () => Promise<void>;
  selectedOrders: string[];
};
export const ChangeDeliveryStates: React.FC<ChangeDeliveryStatesProps> = ({
  open,
  setOpen,
  bulkStatus,
  setBulkStatus,
  handleBulkUpdate,
  selectedOrders,
}) => {
  const handleSave = () => {
    if (selectedOrders.length > 0) {
      handleBulkUpdate();
    }
    setOpen(false);
  };
  return (
    <div>
      <span onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        Change delivery state
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>
          <div>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
            >
              <option value="DELIVERED">DELIVERED</option>
              <option value="PENDING">PENDING</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
