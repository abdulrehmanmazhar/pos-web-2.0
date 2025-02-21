import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddUserMutation } from "../redux/slices/userApiSlice";
import {toast} from 'react-toastify'
import { useAddOrderPaymentMutation, useReturnOrderUdharMutation } from "../redux/slices/orderApiSlice";

const ReturnOrderUdhar: React.FC<{ toggleModal: () => void }> = ({ toggleModal, setPayment, ok, target}) => {
  const [show, setShow] = useState(false);

  const validationSchema = Yup.object({
    payment: Yup.number().required("Payment is required"),
  });

//   const [addPayment,{}] = useAddOrderPaymentMutation()
const [orderUdharPayment,{}] = useReturnOrderUdharMutation();

  const formik = useFormik({
    initialValues: {
      payment: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
                  console.log("Form Data Submitted:", {...values, id:target});
                  try {
                    const result = await orderUdharPayment({...values, id:target});
                    if(result.error){
                    toast.error(result.error.data.message || 'payment not added')
                    return
                    }
                    toast.success('payment added');
                    console.log(result)
                    resetForm();
                    toggleModal();
                  } catch (error) {
                    toast.error('payment not added')
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
                Order Udhar Payment
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
                    Payment
                  </label>
                  <input
                    type="number"
                    name="payment"
                    id="payment"
                    value={formik.values.payment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type member's name"
                  />
                  {formik.touched.payment && formik.errors.payment && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.payment}</p>
                  )}
                </div>

                
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
                Pay Udhar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnOrderUdhar;
