"use client";
import { useState, useEffect } from "react";
export default function Home() {
  const [helloMessage, setHelloMessage] = useState("");
  const getUsers = async () => {
    try {
      const data = await fetch("http://localhost:3001/");
      const hello = await data.json();
      setHelloMessage(hello);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <div>{helloMessage}</div>;
}
