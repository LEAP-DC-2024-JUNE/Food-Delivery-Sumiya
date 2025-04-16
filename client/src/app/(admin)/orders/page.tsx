"use client";
import { getFoodData, updateOrder } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropDownFood } from "@/components/admin/DropDownFood";
import { DeliveryStatus } from "@/components/admin/DeliveryStatus";
import { useState, useEffect } from "react";
import { ChangeDeliveryStates } from "@/components/admin/ChangeDeliverystates";
import { UserOrder, FoodOrderItem } from "@/lib/constants";
export const Orders = () => {
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("PENDING");

  useEffect(() => {
    async function fetchData() {
      const data = await getFoodData("foodorder");
      setUserOrders(data);
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  const handleBulkUpdate = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          updateOrder({ orderId, status: bulkStatus })
        )
      );
      const updatedOrders: UserOrder[] = await getFoodData("foodorder");
      setUserOrders(updatedOrders);
      setSelectedOrders([]);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update order statuses:", error);
    }
  };

  return (
    <div>
      <div>
        <ChangeDeliveryStates
          open={open}
          setOpen={setOpen}
          bulkStatus={bulkStatus}
          setBulkStatus={setBulkStatus}
          handleBulkUpdate={handleBulkUpdate}
          selectedOrders={selectedOrders}
        />
        <style jsx>{`
          .selected-checkbox:hover {
            background-color: #e0e0e0; /* light gray hover */
          }
        `}</style>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOrders(userOrders.map((user) => user._id));
                    } else {
                      setSelectedOrders([]);
                    }
                  }}
                ></input>
              </TableHead>
              <TableHead className="w-[100px]">Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery state</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(user._id)}
                    onChange={(e) =>
                      handleCheckboxChange(user._id, e.target.checked)
                    }
                  ></input>
                </TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell className="w-[150px] flex justify-between">
                  {user.foodOrderItems.length} foods
                  <DropDownFood userfoods={user.foodOrderItems} />
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>${user.totalPrice}</TableCell>
                <TableCell>Arlington, Virginia</TableCell>
                <TableCell>
                  <DeliveryStatus status={user.status} orderId={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
