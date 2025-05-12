import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCustomerRoute, setRoute } from "../redux/slices/customersSlice";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  routes: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ toggleModal, routes }) => {
//   if (!isOpen) return null;

const dispatch = useDispatch();

  const selectedRoute = useSelector(selectCurrentCustomerRoute);

    const handleRouteSelection = (route: string) => {
      // setSelectedRoute(route === selectedRoute ? null : route);
      dispatch(setRoute(route === selectedRoute ? null : route));
  
    };

      const resetFilters = () => {
        dispatch(setRoute(""));
    
    
    
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
        {/* <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Routes</h4>
          <ul className="space-y-2">
            {routes?.map((route, index) => (
              <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-white">
                {route}
              </li>
            ))}
          </ul>
        </div> */}

                  {/* Routes Selection */}
          <div className="p-4">
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

export default FilterModal;
