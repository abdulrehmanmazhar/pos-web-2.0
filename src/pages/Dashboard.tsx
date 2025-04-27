// import React from "react";
// // import LineChart} from "../components/LineChart";

// const Dashboard: React.FC = () => {
//   // return (
//   //   <div className="p-4 ">
//   //     {/* Outer container for scroll */}
//   //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto ">
//   //       {/* Best Selling Products */}
//   //       <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
//   //         <h2 className="text-lg font-semibold mb-2">Top 5 Best Selling Products</h2>
//   //           <Filter/>
//   //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
//   //           {/* Replace with your charting component */}
//   //           <BarChart key="unique-bar-chart-id-1"/>

//   //         </div>
//   //       </div>

//   //       {/* Sales Share Over Time */}
//   //       <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
//   //         <h2 className="text-lg font-semibold mb-2">Sales Share Over Time</h2>
//   //         <Filter/>

//   //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
//   //           {/* Replace with your charting component */}
//   //           <DonutChart key="unique-bar-chart-id-2"/>
//   //         </div>
//   //       </div>

//   //       {/* Order Frequency */}
//   //       <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
//   //         <h2 className="text-lg font-semibold mb-2">Order Frequency</h2>
//   //         <Filter/>

//   //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
//   //           {/* Replace with your charting component */}
//   //           <LineChart key="unique-bar-chart-id-3"/>
//   //         </div>
//   //       </div>

//   //       {/* Stock Values */}
//   //       <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
//   //         <h2 className="text-lg font-semibold mb-2">Transactions Over Time</h2>
//   //         <Filter/>

//   //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
//   //           {/* Replace with your charting component */}
//   //           <MultiLineChart key="unique-bar-chart-id-4"/>
//   //         </div>
//   //       </div>



//   //       {/* Transactions Over Time */}
//   //       <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
//   //         <h2 className="text-lg font-semibold mb-2">Stock Values</h2>
//   //         <Filter/>

//   //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
//   //           {/* Replace with your charting component */}
//   //           <MultiLineChart key="unique-bar-chart-id-6"/>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   return(
//     <></>
//   )
// };

// export default Dashboard;



import {useState} from 'react'
import AddCommunityModal from '../components/AddCommunityModal';
import { useDeleteUserMutation, useGetAllUsersQuery, useVerifyUserMutation } from '../redux/slices/userApiSlice';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/selectors/userSelector';
import { selectCurrentUsers, selectCurrentUsersMaxPages, selectCurrentUsersPageIndex, selectCurrentUsersRowsPerPage, setUserRowsPerPage, setUserSearch, userNext, userPrev } from '../redux/slices/userSlice';
import EditCommunityModal from '../components/EditCommunityModal';
import Table from '../components/Table';
import DeleteModal from '../components/DeleteModal';
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import Filter from '../components/Filter';
import AddTargetModal from '../components/AddTargetModal';
import { targetSelector } from '../redux/slices/selectors/targetSelector';
import { useGetAllTargetsQuery } from '../redux/slices/targetApiSlice';
function Dashboard() {
  const [addUserModal, setAddUserModal] = useState(false);
const [editUserModal, setEditUserModal] = useState(false);
const [deleteUserModal, setDeleteUserModal] = useState(false);
const [detailUserModal, setDetailUserModal] = useState(false);
const [filterUserModal, setFilterUserModal] = useState(false);

const [editItemDetails, setEditItemDetails] = useState('')
const [deleteUserId, setDeleteUserId] = useState('')


  const [selectedItems, setSelectedItems] = useState(new Set());

  const handlePrevious = () => {
    dispatch(userPrev());
  };

  const handleNext = () => {
    dispatch(userNext());
  };


  const {error, isError, isLoading, refetch} = useGetAllUsersQuery();
  const {} = useGetAllTargetsQuery()
  const [verifyUser,{}] = useVerifyUserMutation();
  const [deleteUser, {}] = useDeleteUserMutation()

  const users = useSelector(userSelector);
  const originalUsers = useSelector(selectCurrentUsers);
  const rowsPerPage = useSelector(selectCurrentUsersRowsPerPage);
  const maxPages = useSelector(selectCurrentUsersMaxPages)
  const pageIndex = useSelector(selectCurrentUsersPageIndex)
  const dispatch = useDispatch()
  // console.log(users);
  const targets = useSelector(targetSelector);
  console.log(targets);

  const deleteFunc = (id) => {
    setDeleteUserId(id); // Store ID in state
    setDeleteUserModal((prev) => !prev);
  };
  
  const editFunc = (item) => {
    console.log(item);
    setEditUserModal(prev => !prev);
    setEditItemDetails(item);
  }
  const verifyFunc = async (item) =>{
    console.log(item);
    try {
      const result = await verifyUser(item.id);
      if(result.error){
      toast.error(result.error.data.message)
      }
      toast.success("User is now verified")
    } catch (error) {
      toast.error(error)
    }
  }
  const toggleModal = (type: 'add' | 'edit' | 'delete' | 'detail' | 'filter') => {
    // console.log('clicked');
    switch (type) {
      case 'add':
        setAddUserModal((prev) => !prev);
        break;
      case 'edit':
        setEditUserModal((prev) => !prev);
        break;
      case 'delete':
        setDeleteUserModal((prev) => !prev);
        break;
      case 'detail':
        setDetailUserModal((prev) => !prev);
        break;
      case 'filter':
        setFilterUserModal((prev) => !prev);
        break;
      default:
        break;
    }
  };
    const okDelete = async () => {
      if (!deleteUserId) {
        console.error("No customer ID selected for deletion.");
        return;
      }
    
      try {
        let result = await deleteUser(deleteUserId).unwrap();
        console.log("Delete successful:", result);
        toast.success(result.message);
      } catch (error) {
        console.error("Failed to delete customer:", error);
        toast.error(error);
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
            onChange={(e)=>dispatch(setUserSearch(e.target.value))}
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
        <Filter/>
      </div>

      {/* Results Info */}
      <div className="text-result flex justify-between mt-1 mb-4 px-4 gap-8 w-full items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {users?.length}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {originalUsers?.length}
          </span>
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Selected{" "}
          <span className="font-bold text-gray-900 dark:text-white">20</span>{" "}
          out of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {users?.length}
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
            onChange={(e) => dispatch(setUserRowsPerPage(Number(e.target.value)))}
            className="w-16 px-2 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

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
        ) : users?.length === 0 || users == undefined ? (
          <p className="text-gray-500 text-center text-lg font-semibold">
            No Data Found
          </p>
        ) : (
          <Table
            head={[
              // "id",
              "user",
              'type',
              'product',
              'value',
              'progess',
              'start date',
              'end date',
              "actions",
            ]}
            rows={targets}
            actions={{deleteFunc, editFunc, verifyFunc}}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            detailModal={()=>toggleModal('detail')}
            excludedKeys={["id"]}
            // additionalActions={['Verify']}
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
      {addUserModal&&(<AddTargetModal toggleModal={()=>toggleModal('add')}/>)}
      {editUserModal && <EditCommunityModal toggleModal={()=>(toggleModal('edit'))} details={editItemDetails}/>}
      {deleteUserModal && <DeleteModal toggleModal={()=>(toggleModal('delete'))} message="Do you want to delete this customer" ok={okDelete}/>}
      
    </div>
  );
}

export default Dashboard