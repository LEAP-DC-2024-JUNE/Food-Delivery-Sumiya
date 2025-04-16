// import { getFoodData } from "@/utils";
// export const UserOrderHistory = async () => {
//   const userId = localStorage.getItem("userId");

//   if (!userId) {
//     return <div>User ID not found in local storage.</div>;
//   }
//   try {
//     const userFoodHistory = await getFoodData(`foodorder/user/${userId}`);
//     console.log(userFoodHistory);
//     return <div></div>;
//   } catch (error) {
//     console.error("Error fetching user order history:", error);
//     return <div>Error fetching order history.</div>;
//   }
// };
