"use client";
import { useState, useEffect } from "react";
type UserData = {
  _id: string;
  email: string;
  age: number;
  phoneNumber: string;
};
const GetAllUsers = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const getUsers = async () => {
    const data = await fetch("http://localhost:3001/get-all-users");
    const usersData = await data.json();
    setUserData(usersData);
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(userData);
  if (userData === null) {
    return <div>Loading...</div>;
  }
  if (userData.length === 0) {
    return <div>No users</div>;
  }
  return (
    <div>
      {userData.map((user) => (
        <div key={user._id}>
          <p>{user.email}</p>
          <p>{user.age}</p>
          <p>{user.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};
export default GetAllUsers;
