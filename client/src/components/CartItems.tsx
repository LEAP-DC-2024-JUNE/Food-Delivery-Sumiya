"use client";
import { Cart } from "./svgs/Cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserTab } from "./UserTab";
export const CartItems = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Cart />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#404040]">
          <SheetHeader>
            <SheetTitle className="text-white">Order detail</SheetTitle>
          </SheetHeader>
          <UserTab />
        </SheetContent>
      </Sheet>
    </div>
  );
};
