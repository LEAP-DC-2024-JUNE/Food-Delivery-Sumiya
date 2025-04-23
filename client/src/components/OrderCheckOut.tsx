import { Button } from "@/components/ui/button";
import { CheckOut } from "./svgs/Success";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const OrderCheckOut = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-white bg-red-500">CheckOut</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Your order has been succesfully placed !</DialogTitle>
          </DialogHeader>
          <div>
            <CheckOut />
          </div>
          <DialogFooter>
            <Button type="submit">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
