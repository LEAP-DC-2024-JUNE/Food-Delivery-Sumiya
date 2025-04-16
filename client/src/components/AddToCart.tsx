import { FoodDialogContent } from "./FoodDialogContent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
export const AddToCart = ({ food }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-[#EF4444] text-xl rounded-2xl"
          >
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <FoodDialogContent food={food} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
