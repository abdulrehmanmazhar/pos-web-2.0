import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddUserMutation, useAssignRouteMutation, useDeleteAssignedRouteMutation } from "../redux/slices/userApiSlice";
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { selectCurrentUsers } from "../redux/slices/userSlice";
import { objectCollector } from "../utils/objectCollector";
import { selectCurrentCustomers } from "../redux/slices/customersSlice";

const EditCommunityModal: React.FC<{ toggleModal: () => void, details: any }> = ({ toggleModal, details }) => {
  const [show, setShow] = useState(false);
  const [route, setRoute] = useState('');
  const [routes, setRoutes] = useState(objectCollector(useSelector(selectCurrentCustomers),'route'));

  const {id, name, email, routes: userRoutes } = details;
  const user = useSelector(selectCurrentUsers).filter(item => item._id == id)[0];
  console.log(user)
  console.log("details",details)
  const [assignRoutes,{}] = useAssignRouteMutation();
  const [deleteAssignedRoute,{}] = useDeleteAssignedRouteMutation()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    // password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const addRoute = () => {
    if (route.trim() !== '' && !routes.includes(route)) {
      setRoutes([...routes, route]); // Add new category
      setRoute(''); // Clear input after adding
    }
  };

  //   const [addUser,{}] = useAddUserMutation()
  // const [editUser, {}] = useEdit

  const formik = useFormik({
    initialValues: {
      id,
      name,
      email,
      route: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
                      console.log("Form Data Submitted:", values);
                      try {
                        const result = await assignRoutes(values);
                        if(result.error){
                        toast.error(result.error.data.message)
                        return
                        }
                        toast.success('route added');
                        console.log(result)
                        resetForm();
                        toggleModal();
                      } catch (error) {
                        toast.error('route not added')
                      }
        
                    }
  });

  const deleteAssignedRouteHandler = async (index) =>{
    try {
      const result = await deleteAssignedRoute({id, index});
      if(result.error){
      toast.error(result.error.data.message)
      return
      }
      toast.success('route deleted');
    } catch (error) {
      toast.error('route not deleted')
    }
  }

  return (
    <>
      {/* Main Modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full m-auto">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Community Member
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    readOnly
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type member's name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    readOnly
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type member's email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                  )}
                </div>
                <div className="col-span-2">
      <label
        htmlFor="routes-display"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Routes
      </label>
      <div
        id="routes-display"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 flex gap-2"
      >
        {
        // userRoutes.split(",")
        // user.routes?user.routes:[]
        user.routes
        .map((item, index) => (
          <div
            key={index}
            className="relative cursor-pointer select-none text-white flex items-center bg-blue-700 justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={()=>deleteAssignedRouteHandler(index)}
          >
            {item}
            <div className="absolute -top-2 -right-2 bg-red-500 px-2 rounded-lg text-xs text-white">
              -
            </div>
          </div>
        ))}
      </div>
    </div>

                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add new Route
                  </label>
                  <input
                    type="text"
                    name="route"
                    id="route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="1"
                  />
                  {/* {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">{formik.errors.category}</div>
                  ) : null} */}
                  <div className="absolute right-1 bottom-1 cursor-pointer select-none text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 pl-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addRoute}>
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Route
                  </label>
                  <select
                    id="route"
                    name="route"
                    value={formik.values.route}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select route</option>
                    {
                      routes.map((item) => (
                        <option value={item}>{item}</option>
                      ))
                    }
                    {/* <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option> */}
                  </select>
                  {formik.touched.route && formik.errors.route ? (
                    <div className="text-red-500 text-sm">{formik.errors.route}</div>
                  ) : null}
                </div>

                {/* <div className="col-span-2 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type password"
                  />
                  <div
                    className="absolute cursor-pointer right-1 bottom-1 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? "Hide" : "Show"}
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                  )}
                </div> */}
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center select-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Edit member
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCommunityModal;
