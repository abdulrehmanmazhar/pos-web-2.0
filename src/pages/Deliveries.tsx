import React, {useState} from 'react'
import Filter from "../components/Filter";
function Deliveries() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(["001", "002", "003", "004"]);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (e, id) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

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
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            View
          </button>
          <button
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Filters
          </button>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Create
          </button>
        </div>
      </div>

      {/* Filter Component */}
      <div className="w-[calc(90vw)] flex justify-center">
        <Filter />
      </div>

      {/* Results Info */}
      <div className="text-result flex justify-start mt-1 mb-4 pl-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-bold text-gray-900 dark:text-white">20</span> out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">240</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[calc(90vw)] rounded-lg">
        <table className="min-w-full bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="bg-blue-600 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === 4}
                />
              </th>
              {[
                "ID",
                "Customer",
                "Dated",
                "Route",
                "Delivered At",
                "Status",
                "Delivery",
                "Price",
                "Created By",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "001",
                customer: "John Doe",
                createdAt: "2025-01-20",
                route: "Route A",
                distributionDate: "2025-01-22",
                status: "Pending",
                delivery: "Express",
                price: "$100",
                createdBy: "Admin",
              },
              {
                id: "002",
                customer: "Jane Smith",
                createdAt: "2025-01-18",
                route: "Route B",
                distributionDate: "2025-01-19",
                status: "Delivered",
                delivery: "Standard",
                price: "$250",
                createdBy: "Manager",
              },
              {
                id: "003",
                customer: "Alice Brown",
                createdAt: "2025-01-15",
                route: "Route C",
                distributionDate: "2025-01-16",
                status: "Cancelled",
                delivery: "None",
                price: "$0",
                createdBy: "Support",
              },
              {
                id: "004",
                customer: "Alice Brown",
                createdAt: "2025-01-15",
                route: "Route C",
                distributionDate: "2025-01-16",
                status: "Cancelled",
                delivery: "None",
                price: "$0",
                createdBy: "Support",
              },
            ].map((item, index) => (
              <tr
                key={item.id}
                className={`border-t border-gray-300 dark:border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(e, item.id)}
                  />
                </td>
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    className="px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300"
                  >
                    {value}
                  </td>
                ))}
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                  <button className="text-blue-600 hover:underline">Edit</button> |{" "}
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-4 right-4 flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Deliveries