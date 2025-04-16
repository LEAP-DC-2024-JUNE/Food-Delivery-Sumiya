import { FooterImage } from "./svgs/FooterImage";
import { Facebook } from "./svgs/Facebook";
import { DeliveryLogo } from "./svgs/DeliveryLogo";
import { Instagram } from "./svgs/Instagram";
export const Footer = () => {
  return (
    <div className="bg-[#18181B] max-w-[1440px] py-[60px] flex flex-col gap-[76px]">
      <div>
        <FooterImage />
      </div>
      <div className="px-[88px] flex gap-[220px]">
        <div>
          <DeliveryLogo />
        </div>
        <div className="flex gap-[112px]">
          <div className="flex flex-col gap-4">
            <p className="text-[#71717a]">NOMNOM</p>
            <p className="text-[#FAFAFA]">Home</p>
            <p className="text-[#FAFAFA]">Contact Us</p>
            <p className="text-[#FAFAFA]"> Delivery Zone</p>
          </div>
          <div>
            <p className="text-[#71717a]">MENU</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#71717a]">FOLLOW US</p>
            <div className="flex gap-4">
              <Facebook />
              <Instagram />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-12 px-[88px]">
        <p className="text-[#71717a]">Copy right 2024 @ Nomnom LLC</p>
        <p className="text-[#71717a]">Privacy policy </p>
        <p className="text-[#71717a]">Terms and conditoin</p>
        <p className="text-[#71717a]">Cookie policy</p>
      </div>
    </div>
  );
};
