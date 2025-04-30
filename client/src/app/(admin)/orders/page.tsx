"use client";
import { getFoodOrderData, updateOrder } from "@/utils";
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
import { UserOrder } from "@/lib/constants";
import { DatePickerWithRange } from "@/components/admin/DateRangeWithPicker";
import { DateRange } from "react-day-picker";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
const ITEMS_PER_PAGE = 5;
const OrdersPage = () => {
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("PENDING");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const data = await getFoodOrderData("foodorder", dateRange);
      setUserOrders(data);
      setTotalItems(data.length);
    }
    fetchData();
  }, [dateRange]);
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
      const updatedOrders: UserOrder[] = await getFoodOrderData("foodorder");
      setUserOrders(updatedOrders);
      setSelectedOrders([]);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update order statuses:", error);
    }
  };
  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setCurrentPage(1);
  };

  const filteredOrders = userOrders.filter((order) => {
    if (!dateRange?.from || !dateRange?.to) {
      return true;
    }
    const orderDate = new Date(order.createdAt);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>Orders</div>
        <div className="flex items-center mb-4">
          <DatePickerWithRange onDateChange={handleDateChange} />
          {dateRange?.from && dateRange?.to && (
            <button
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setDateRange(undefined);
                setCurrentPage(1);
              }}
            >
              Clear Date Filter
            </button>
          )}
        </div>
        <div>
          <ChangeDeliveryStates
            open={open}
            setOpen={setOpen}
            bulkStatus={bulkStatus}
            setBulkStatus={setBulkStatus}
            handleBulkUpdate={handleBulkUpdate}
            selectedOrders={selectedOrders}
          />
        </div>
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
            {paginatedOrders.map((user) => (
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
                <TableCell>{user?.user?.email}</TableCell>
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
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center p-4">
                  No orders found for the selected date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    className={
                      page === currentPage
                        ? "bg-blue-500 text-white rounded-md"
                        : ""
                    }
                  >
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
export default OrdersPage;
