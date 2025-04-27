import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetAllProductsQuery } from '../redux/slices/inventoryApiSlice';
import { toast } from 'react-toastify';
import { useAddTargetMutation } from '../redux/slices/targetApiSlice';
import { useGetAllUsersQuery } from '../redux/slices/userApiSlice';

const AddTargetModal: React.FC = ({ toggleModal }) => {
  const [addTarget] = useAddTargetMutation();
  const [types, setTypes] = useState(["sales", "orders", "quantity"]);

  const { data: userData } = useGetAllUsersQuery();
  const { data: productData } = useGetAllProductsQuery();
  const users = userData?.users || [];
  const products = productData?.products || [];

  const validationSchema = Yup.object({
    userId: Yup.string().required('User is required'),
    productId: Yup.string(),
    type: Yup.string().required('Type is required'),
    value: Yup.number().min(1, 'Value must be greater than 0').required('Value is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be after start date')
      .required('End date is required'),
  });

  const formik = useFormik({
    initialValues: {
      userId: '',
      productId: '',
      value: 0,
      type: '',
      startDate: '',
      endDate: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Data Submitted:", values);
      try {
        const result = await addTarget(values);
        if (result.error) {
          toast.error(result.error.data.message);
          return;
        }
        toast.success('Target added');
        console.log(result);
        resetForm();
        toggleModal();
      } catch (error) {
        toast.error('Target not added');
      }
    }
  });

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
                Create New Target
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
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Type</option>
                    {types.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-red-500 text-sm">{formik.errors.type}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User
                  </label>
                  <select
                    id="userId"
                    name="userId"
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>{`${user.name} (${user.email})`}</option>
                    ))}
                  </select>
                  {formik.touched.userId && formik.errors.userId ? (
                    <div className="text-red-500 text-sm">{formik.errors.userId}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="productId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product
                  </label>
                  <select
                    id="productId"
                    name="productId"
                    value={formik.values.productId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>{`${product.name} (${product.category})`}</option>
                    ))}
                  </select>
                  {formik.touched.productId && formik.errors.productId ? (
                    <div className="text-red-500 text-sm">{formik.errors.productId}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
                  ) : null}
                </div>

                <div className="col-span-2 ">
                  <label
                    htmlFor="value"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <div className="text-red-500 text-sm">{formik.errors.value}</div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                Add new Target
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTargetModal;