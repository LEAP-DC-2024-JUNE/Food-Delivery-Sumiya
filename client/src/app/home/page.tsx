"use client";
import BadgeUi from "@/components/Badge";
import {
  BadgeData,
  AppetizerData,
  SaladData,
  LunchData,
} from "@/components/FoodData";
import { useState, useRef, useEffect } from "react";
import FoodCard from "@/components/FoodCard";
export type CardType = {
  id: string;
  img: string;
  title: string;
  price: number;
  description: string;
};
export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + BadgeData.length) % BadgeData.length
    );
  };

  const handleRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BadgeData.length);
  };
  const visibleBadges = BadgeData.slice(currentIndex, currentIndex + 5);
  return (
    <div className="relative max-w-full bg-[#232323]">
      <img src="/foodhome.png" className=""></img>
      <div className="">
        <h1>Categories</h1>
        <div className="flex gap-2 overflow-x-hidden">
          <button onClick={handleLeft} className="text-white">
            left
          </button>
          <div className="flex whitespace-nowrap transition-transform duration-300">
            {visibleBadges.map((data, index) => (
              <BadgeUi key={index} data={data} isActive={index === 0} />
            ))}
          </div>
          <button onClick={handleRight} className="text-white">
            right
          </button>
        </div>
      </div>
      <div className="max-w-7xl">
        <p className="text-[30px] text-white">Appetizers</p>
        <div className="flex flex-wrap gap-10">
          {AppetizerData.map((appetizer) => {
            return (
              <FoodCard
                food={appetizer}
                key={appetizer.id}
                showMenu={showMenu}
                toggleMenu={toggleMenu}
              />
            );
          })}
        </div>
        <p className="text-{30px] text-white">Salads</p>
        <div className="flex flex-wrap gap-10">
          {SaladData.map((salad) => {
            return (
              <FoodCard
                food={salad}
                key={salad.id}
                showMenu={showMenu}
                toggleMenu={toggleMenu}
              />
            );
          })}
        </div>
        <p className="text-[30px] text-white">Lunch favorites</p>
        <div>
          <div className="flex flex-wrap gap-10">
            {LunchData.map((lunch) => {
              return (
                <FoodCard
                  food={lunch}
                  key={lunch.id}
                  showMenu={showMenu}
                  toggleMenu={toggleMenu}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
