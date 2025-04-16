import { FoodDialogContent } from "./FoodDialogContent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodItem } from "@/lib/constants";
interface AddToCartProps {
  food: FoodItem;
}
export const AddToCart = ({ food }: AddToCartProps) => {
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
