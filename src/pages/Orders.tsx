import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../redux/slices/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { filteredOrders } from "../redux/slices/selectors/orderSelector";
import Table from "../components/Table";
import DeleteModal from "../components/DeleteModal";
import { toast } from 'react-toastify';
import DetailModal from "../components/DetailModal";
import { ordersNext, ordersPrev, selectCurrentOrders, selectCurrentOrdersMaxPages, selectCurrentOrdersPageIndex, selectCurrentOrdersRowsPerPage, setOrdersDate, setOrdersRowsPerPage, setOrdersSearch } from "../redux/slices/orderSlice";
import AddPaymentModal from "../components/AddPaymentModal";
import GenerateOrder from "../components/GenerateOrders";
import GenerateRouteCard from "../components/GenerateRouteCard";
import OrderDetailModal from "../components/OrderDetailModal";
import OrderFilterModal from "../components/OrderFilterModal";
import { objectCollector } from "../utils/objectCollector";

function Orders() {
  const [editOrderModal, setEditOrderModal] = useState(false);
  const [deleteOrderModal, setDeleteOrderModal] = useState(false);
  const [detailOrderModal, setDetailOrderModal] = useState(false);
  const [filterOrderModal, setFilterOrderModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState('');

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const { refetch, error, isError, isLoading } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const orders = useSelector(filteredOrders);
  const originalOrders = useSelector(selectCurrentOrders)
  const pageIndex = useSelector(selectCurrentOrdersPageIndex);
  const maxPages = useSelector(selectCurrentOrdersMaxPages);
  const rowsPerPage = useSelector(selectCurrentOrdersRowsPerPage)
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(0);
  const [editTarget, setEditTarget] = useState('');
  const [date, setDate] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(()=>{dispatch(setOrdersDate(date))},[date])
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    dispatch(ordersPrev())
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    dispatch(ordersNext())
  };

  const deleteFunc = (id) => {
    setDeleteOrderModal(prev => !prev);
    setTargetDeleteId(id);
  };

  const editFunc = (item) => {
    console.log(item);
    setEditOrderModal(prev=>!prev);
    setEditTarget(item.id);
    console.log(item.id)
  };

  // console.log(selectedItems);

  const toggleModal = (type) => {
    switch (type) {
      case 'edit':
        setEditOrderModal((prev) => !prev);
        break;
      case 'delete':
        setDeleteOrderModal((prev) => !prev);
        break;
      case 'detail':
        setDetailOrderModal((prev) => !prev);
        break;
      case 'filter':
        setFilterOrderModal((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const okDelete = async () => {
    if (!targetDeleteId) {
      console.error("No customer ID selected for deletion.");
      return;
    }

    try {
      let result = await deleteOrder(targetDeleteId).unwrap();
      console.log("Delete successful:", result);
      toast.success(result.message);
    } catch (error) {
      toast.error(error?.data?.message);
      console.error("Failed to delete order:", error);
    }
  };

  const okHandler = () => {
    console.log('ok Handler')
  }
console.log(date)
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Search Bar and Buttons */}
      <div className="flex items-center gap-4 p-4 w-[100%]">
        <div className="relative w-[100%] shadow-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by any parameter Name, Contact..."
            required
            onChange={e=>dispatch(setOrdersSearch(e.target.value))}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={refetch}
          >
            Refresh
          </button>
          <button
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={()=>toggleModal('filter')}
          >
            Filters
          </button>
          <Link to={'/sell'}>
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Create
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Component */}
      <div className="w-[calc(90vw)] flex justify-center">
        <Filter setDate={setDate}/>
      </div>

      {/* Results Info */}
      <div className="text-result flex justify-between mt-1 mb-4 px-4 gap-8 w-full items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {orders?.length}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {originalOrders?.length}
          </span>
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Selected{" "}
          <span className="font-bold text-gray-900 dark:text-white">{selectedItems?.size || 0}</span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {orders?.length}
          </span>
        </p>

        {/* Input for Rows Per Page */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="rowsInput"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Rows:
          </label>
          <input
            id="rowsInput"
            type="number"
            min="1"
            max={1000}
            value={rowsPerPage}
            onChange={(e) => dispatch(setOrdersRowsPerPage(Number(e.target.value)))}
            className="w-16 px-2 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto w-[calc(90vw)] rounded-lg mb-16">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center text-lg">
            {error?.data?.message || "Something went wrong!"}
          </p>
        ) : orders?.length === 0 || orders == undefined ? (
          <p className="text-gray-500 text-center text-lg font-semibold">
            No Data Found
          </p>
        ) : (
          <Table
            head={[
              "Sr.#",
              "Customer",
              "Created At",
              "Created By",
              "Delivery Date",
              "Delivery",
              "Disc",
              "Order Value",
              "payment",
              "Route",
              "Actions",
            ]}
            rows={orders}
            actions={{ deleteFunc, editFunc }}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            detailModal={(detail) => {toggleModal('detail'); setDetail(detail)}}
            excludedKeys={["id", "cart", "customerDetail", "message"]}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-4 right-4 flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={pageIndex === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            pageIndex === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page <strong>{pageIndex}</strong> of <strong>{maxPages}</strong>
        </span>
        <button
          onClick={handleNext}
          disabled={pageIndex === maxPages}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            pageIndex === maxPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>

      {/* Print bills  */}
      {selectedItems?.size>0&&<div className="fixed bottom-4 left-24 flex justify-center items-center mt-4 space-x-4">
        <GenerateOrder selectedItems={selectedItems}/>
        <GenerateRouteCard selectedItems={selectedItems}/>
      </div>}

      {/* Modals */}
      {deleteOrderModal && (
        <DeleteModal toggleModal={()=>toggleModal('delete')} message='Do you want to delete this product' ok={okDelete}/>
      )}
      { editOrderModal && (
        <AddPaymentModal toggleModal={()=>toggleModal('edit')} setPayment={setPayment} ok={okHandler} target={editTarget}/>
      )}
      { detailOrderModal && (
        <OrderDetailModal toggleModal={()=>toggleModal('detail')} order={detail}/>
      )}
      { filterOrderModal && (
        <OrderFilterModal toggleModal={()=>toggleModal('filter')}/>
      )}
    </div>
  );
}

export default Orders;
