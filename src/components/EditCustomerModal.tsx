import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEditCustomerMutation } from "../redux/slices/customersApiSlice";
import { toast } from "react-toastify";
interface AddCustomerModalProps {
  toggleModal: () => void;
}

const EditCustomerModal: React.FC<AddCustomerModalProps> = ({ toggleModal, details }) => {

  const {id, name, businessName, contact, route, address}= details


  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    businessName: Yup.string().required("Business name is required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Contact must be a valid number")
      .min(11, "Must be at least 11 digits")
      .required("Contact is required"),
    route: Yup.string().required("Route is required"),
    address: Yup.string().required("Address is required"),
  });

  const [editCustomer,{data, error, isError, isLoading}] = useEditCustomerMutation()

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Customer
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

          {/* Formik Form */}
          <Formik
            initialValues={{
              id: id,
              name: name,
              businessName: businessName,
              contact: contact,
              route: route,
              address: address,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log("Form Data Submitted:", values);
              try {
                const result = await editCustomer(values);
                if(result.error){
                toast.error(result.error.data.message)
                return
                }
                toast.success('customer edited');
                console.log(result)
                resetForm();
                toggleModal();
              } catch (error) {
                toast.error('customer not edited')
              }

            }}
          >
            {({ errors, touched }) => (
              <Form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {/* Name */}
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.name && touched.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Type customer's name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Business Name */}
                  <div className="col-span-2">
                    <label
                      htmlFor="businessName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Business Name
                    </label>
                    <Field
                      type="text"
                      name="businessName"
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.businessName && touched.businessName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Type customer's business name"
                    />
                    <ErrorMessage name="businessName" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Contact */}
                  <div className="col-span-2">
                    <label
                      htmlFor="contact"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contact
                    </label>
                    <Field
                      type="text"
                      name="contact"
                      readOnly
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.contact && touched.contact ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Type customer's contact"
                    />
                    <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Address */}
                  <div className="col-span-2">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <Field
                      type="text"
                      name="address"
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.address && touched.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Type customer's address"
                    />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Route */}
                  <div className="col-span-2">
                    <label
                      htmlFor="route"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Route
                    </label>
                    <Field
                      type="text"
                      name="route"
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.route && touched.route ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Type customer's route"
                    />
                    <ErrorMessage name="route" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Edit customer
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
