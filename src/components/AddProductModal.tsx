import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddProductMutation } from '../redux/slices/inventoryApiSlice';
import {toast} from 'react-toastify'
import { objectCollector } from '../utils/objectCollector';
import { useSelector } from 'react-redux';
import { selectCurrentInventories } from '../redux/slices/inventorySlice';
const AddProductModal: React.FC = ({ toggleModal }) => {

  const [addProduct,{data, error, isError, isLoading}] = useAddProductMutation();
  const products  = useSelector(selectCurrentInventories);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(objectCollector(products, 'category'));

  console.log(category);
  console.log(categories);
  

  const addCategory = () => {
    if (category.trim() !== '' && !categories.includes(category)) {
      setCategories([...categories, category]); // Add new category
      setCategory(''); // Clear input after adding
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    stockQty: Yup.number().required('Quantity is required').integer('Quantity must be an integer').positive('Quantity must be positive'),
    discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
    totalBill: Yup.number().required('Total Bill is required').min(0, 'Total Bill cannot be negative'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      stockQty: '',
      discount: '',
      totalBill: '',
    },
    validationSchema,
    onSubmit:async (values, { resetForm }) => {
                  console.log("Form Data Submitted:", values);
                  try {
                    const result = await addProduct(values);
                    if(result.error){
                    toast.error(result.error.data.message)
                    return
                    }
                    toast.success('product added');
                    console.log(result)
                    resetForm();
                    toggleModal();
                  } catch (error) {
                    toast.error('product not added')
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
                Create New Product
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="PKR 2999"
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-500 text-sm">{formik.errors.price}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="stockQty"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qty
                  </label>
                  <input
                    type="number"
                    name="stockQty"
                    id="stockQty"
                    value={formik.values.stockQty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="100"
                  />
                  {formik.touched.stockQty && formik.errors.stockQty ? (
                    <div className="text-red-500 text-sm">{formik.errors.stockQty}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="PKR 99"
                  />
                  {formik.touched.discount && formik.errors.discount ? (
                    <div className="text-red-500 text-sm">{formik.errors.discount}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalBill"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Bill
                  </label>
                  <input
                    type="number"
                    name="totalBill"
                    id="totalBill"
                    value={formik.values.totalBill}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="PKR 2999"
                  />
                  {formik.touched.totalBill && formik.errors.totalBill ? (
                    <div className="text-red-500 text-sm">{formik.errors.totalBill}</div>
                  ) : null}
                </div>
                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add new Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="1000ml"
                  />
                  {/* {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">{formik.errors.category}</div>
                  ) : null} */}
                  <div className="absolute right-1 bottom-1 cursor-pointer select-none text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 pl-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addCategory}>
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
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select category</option>
                    {
                      categories.map((item)=>(
                    <option value={item}>{item}</option>
                      ))
                    }
                  </select>
                  {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">{formik.errors.category}</div>
                  ) : null}
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Invoice
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
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
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;