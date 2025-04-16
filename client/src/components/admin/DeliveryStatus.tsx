"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { updateOrder } from "@/utils";
type DeliveryStatusProps = {
  status: string;
  orderId: string;
};
export const DeliveryStatus: React.FC<DeliveryStatusProps> = ({
  status,
  orderId,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [open, setOpen] = useState(false);
  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrder({ orderId: orderId, status: newStatus });
      setCurrentStatus(newStatus);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{currentStatus}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change delivery stats</DialogTitle>
          </DialogHeader>
          <div className="flex justify-around">
            <Button
              variant="secondary"
              onClick={() => handleStatusChange("DELIVERED")}
            >
              DELIVERED
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleStatusChange("PENDING")}
            >
              PENDING
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleStatusChange("CANCELLED")}
            >
              CANCELLED
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setOpen(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
