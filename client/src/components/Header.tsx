import { DeliveryLogo } from "./svgs/DeliveryLogo";
import { CartItems } from "./CartItems";
import { LoginIcon } from "./svgs/LoginIcon";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="bg-[#18181B] flex justify-between max-w-[1440px] w-full px-[88px] items-center py-3">
      <div>
        <DeliveryLogo />
      </div>
      <div className="flex gap-3">
        <CartItems />
        <Link href="/login">
          {" "}
          <LoginIcon />{" "}
        </Link>
      </div>
    </div>
  );
};
