import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllCustomersQuery } from "../redux/slices/customersApiSlice";
import { objectCollector } from "../utils/objectCollector";
import { useGetAllUsersQuery } from "../redux/slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrdersCreatedBySearch, selectCurrentOrdersDeliveryDateSearch, selectCurrentOrdersRouteSearch, setOrdersCreatedBySearch, setOrdersDeliveryDateSearch, setOrdersRouteSearch } from "../redux/slices/orderSlice";

interface FilterModalProps {
  toggleModal: () => void;
}

const OrderFilterModal: React.FC<FilterModalProps> = ({ toggleModal }) => {
//   const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
//   const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
//   const [deliveryDate, setDeliveryDateState] = useState<Date | null>(null);

  const dispatch = useDispatch()

  const selectedRoute = useSelector(selectCurrentOrdersRouteSearch);
  const selectedCreator = useSelector(selectCurrentOrdersCreatedBySearch);
  const deliveryDate = useSelector(selectCurrentOrdersDeliveryDateSearch);
  console.log(deliveryDate);

  const { data: customers } = useGetAllCustomersQuery();
  const { data: users } = useGetAllUsersQuery();

  const routes = customers ? objectCollector(customers.customers, "route") : [];
  const creators = users ? objectCollector(users.users, "name") : [];

  const handleRouteSelection = (route: string) => {
    // setSelectedRoute(route === selectedRoute ? null : route);
    dispatch(setOrdersRouteSearch(route === selectedRoute ? null : route));

  };

  const handleCreatorSelection = (creator: string) => {
    // dispatch(setSelectedCreator(creator === selectedCreator ? null : creator));
    dispatch(setOrdersCreatedBySearch(creator === selectedCreator ? null : creator));

  };

  const handleDateChange = (date: Date | null) => {
    // setDeliveryDateState(date);
    dispatch(setOrdersDeliveryDateSearch(date.toISOString().split("T")[0]));

  };

  const resetFilters = () => {
    dispatch(setOrdersDeliveryDateSearch(""));
    dispatch(setOrdersCreatedBySearch(""));
    dispatch(setOrdersRouteSearch(""));



  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-lg w-full">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Filters</h3>
          <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col p-4 justify-around">

          {/* Routes Selection */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Routes</h4>
            <ul className="flex flex-row flex-wrap gap-2">
              {routes.map((route, index) => (
                <li
                  key={index}
                  onClick={() => handleRouteSelection(route)}
                  className={`p-2 rounded-md cursor-pointer transition-colors text-gray-700 dark:text-white ${
                    selectedRoute === route ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {route}
                </li>
              ))}
            </ul>
          </div>

          {/* Created By Selection */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Created By</h4>
            <ul className="flex flex-row flex-wrap gap-2">
              {creators.map((creator, index) => (
                <li
                  key={index}
                  onClick={() => handleCreatorSelection(creator)}
                  className={`p-2 rounded-md cursor-pointer transition-colors text-gray-700 dark:text-white ${
                    selectedCreator === creator ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {creator}
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Date Picker */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Delivery Date</h4>
            <DatePicker
              selected={deliveryDate}
              onChange={handleDateChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
              placeholderText="Select a date"
            />
          </div>

          </div>
          {/* Reset Filters Button */}
          {/* <div className="w-full flex justify-center mt-4">
  <button
    onClick={resetFilters}
    className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-sm transition-all mb-4"
  >
    Reset Filters
  </button>
</div> */}




        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-600">
          <button
            onClick={resetFilters}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2 text-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilterModal;
