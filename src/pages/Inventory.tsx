import {useState, useEffect} from 'react'
import AddProductModal from '../components/AddProductModal';
import Filter from '../components/Filter';
import { filteredInventories } from '../redux/slices/selectors/inventorySelector';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../redux/slices/inventoryApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import RestockInventoryModal from '../components/RestockInventoryModal';
import DeleteModal from '../components/DeleteModal';
import { toast } from "react-toastify";
import { inventoriesNext, inventoriesPrev, selectCurrentInventories, selectCurrentInventoriesMaxPages, selectCurrentInventoriesRowsPerPage, setInventoriesDate, setInventoriesRowsPerPage, setInventoriesSearch } from '../redux/slices/inventorySlice';
import { selectCurrentCustomerPageIndex } from '../redux/slices/customersSlice';

function Inventory() {
  const [addInventoryModal, setAddInventoryModal] = useState(false);
const [editInventoryModal, setEditInventoryModal] = useState(false);
const [deleteInventoryModal, setDeleteInventoryModal] = useState(false);
const [detailInventoryModal, setDetailInventoryModal] = useState(false);
const [filterInventoryModal, setFilterInventoryModal] = useState(false);

  const { error, isError, isLoading, refetch } = useGetAllProductsQuery();
  const [deleteProduct,{}] = useDeleteProductMutation()
  const [selectedItems, setSelectedItems] = useState(new Set());
  const dispatch = useDispatch();

  const inventories = useSelector(filteredInventories);
  const originalInventories = useSelector(selectCurrentInventories);
  const rowsPerPage = useSelector(selectCurrentInventoriesRowsPerPage);
  const pageIndex = useSelector(selectCurrentCustomerPageIndex);
  const maxPages = useSelector(selectCurrentInventoriesMaxPages);
  const [editDetails, setEditDetails] = useState('');
  const [deleteId, setDeleteId] = useState('')
  const [date, setDate] = useState('');

  useEffect(()=>{dispatch(setInventoriesDate(date))},[date])
 



  const deleteFunc = (id) => {
    setDeleteInventoryModal(prev=>!prev)
    setDeleteId(id);
  };

  const editFunc = (item) => {
    setEditInventoryModal(prev=>!prev)
    setEditDetails(item);
    console.log(item);
  }

  const toggleModal = (type: 'add' | 'edit' | 'delete' | 'detail' | 'filter') => {
    // console.log('clicked');
    switch (type) {
      case 'add':
        setAddInventoryModal((prev) => !prev);
        break;
      case 'edit':
        setEditInventoryModal((prev) => !prev);
        break;
      case 'delete':
        setDeleteInventoryModal((prev) => !prev);
        break;
      case 'detail':
        setDetailInventoryModal((prev) => !prev);
        break;
      case 'filter':
        setFilterInventoryModal((prev) => !prev);
        break;
      default:
        break;
    }
  };
  
    const okDelete = async () => {
      if (!deleteId) {
        console.error("No customer ID selected for deletion.");
        return;
      }
    
      try {
        let result = await deleteProduct(deleteId).unwrap();
        console.log("Delete successful:", result);
        toast.success(result.message);
      } catch (error) {
        console.error("Failed to delete customer:", error);
        toast.error(error);
      }
    };

      const handlePrevious = () => {
        dispatch(inventoriesPrev());
      };
    
      const handleNext = () => {
        dispatch(inventoriesNext());
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
            onChange={e=>dispatch(setInventoriesSearch(e.target.value))}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={refetch}
          >
            Refresh
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
            onClick={()=>toggleModal('add')}
          >
            Create
          </button>
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
            {inventories?.length}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {originalInventories?.length}
          </span>
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Selected{" "}
          <span className="font-bold text-gray-900 dark:text-white">20</span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {inventories?.length}
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
            onChange={(e) => dispatch(setInventoriesRowsPerPage(Number(e.target.value)))}
            className="w-16 px-2 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Table
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
      </div> */}
            {/* Table */}
            <div className="overflow-x-auto w-[calc(90vw)] rounded-lg mb-16">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center text-lg">
            {error?.data?.message || "Something went wrong!"}
          </p>
        ) : inventories?.length === 0 || inventories == undefined ? (
          <p className="text-gray-500 text-center text-lg font-semibold">
            No Data Found
          </p>
        ) : (
          <Table
            head={[
              // "id",
              "name",
              "category",
              "stock status",
              "Sale Price",
              "purchase price",
              "discount",
              "sold",
              "current Stock",
              // "stock value",
              "actions",
            ]}
            rows={inventories}
            actions={{deleteFunc, editFunc}}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            detailModal={()=>toggleModal('detail')}
            excludedKeys={["id"]}
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

      {/* Add Product Modal */}
      {addInventoryModal&&(<AddProductModal toggleModal={()=>toggleModal('add')}/>)}
      {editInventoryModal&&(<RestockInventoryModal toggleModal={()=>toggleModal('edit')} details={editDetails}/>)}
      {deleteInventoryModal&&(<DeleteModal toggleModal={()=>toggleModal('delete')} message='Do you want to delete this product' ok={okDelete}/>)}
      
    </div>
  );
}

export default Inventory


