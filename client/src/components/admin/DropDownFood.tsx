import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type UserFoodItem = {
  food: {
    foodName: string;
    image: string;
  };
  quantity: number;
};

type DropDownFoodProps = {
  userfoods: UserFoodItem[];
};
export const DropDownFood: React.FC<DropDownFoodProps> = ({ userfoods }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl">
          &#129171;
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userfoods?.map((user) => (
            <div key={user?.food?.foodName}>
              <DropdownMenuItem className="flex justify-between">
                <img
                  src={user?.food?.image}
                  className="w-[32px] h-[30px]"
                  alt={user?.food?.foodName}
                />{" "}
                x{user.quantity}
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
