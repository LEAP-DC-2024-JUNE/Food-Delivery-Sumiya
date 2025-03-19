"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GetAllUsers from "@/components/GetAllUsers";
type UserType = {
  email: string;
  age: number | string;
  phoneNumber: string;
};
const UserForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>({
    email: "",
    age: "",
    phoneNumber: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:3001/create-user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    router.push("/user");
  };
  return (
    <div>
      <div>
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <GetAllUsers />
    </div>
  );
};
export default UserForm;
