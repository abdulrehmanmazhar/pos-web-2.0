import React from "react";

const OrderDetailModal = ({ toggleModal, order }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-4xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order Details - #{order.index}
          </h3>
          <button
            onClick={toggleModal}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          
          {/* Order Details */}
          <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Customer:</span> {order.customer}</p>
            <p><span className="font-semibold">Created By:</span> {order.createdBy}</p>
            <p><span className="font-semibold">Created At:</span> {order.createdAt}</p>
            <p><span className="font-semibold">Delivery Date:</span> {order.devliveryDate}</p>
            <p><span className="font-semibold">Route:</span> {order.route}</p>
            <p><span className="font-semibold">Discount:</span> {order.discount} PKR</p>
            <p><span className="font-semibold">Total Price:</span> {order.price} PKR</p>
            <p><span className="font-semibold">Payment:</span> {order.payment}</p>
            <p><span className="font-semibold">Delivery Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-lg text-sm font-medium ${order.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {order.deliveryStatus}
              </span>
            </p>
            {order.message && <p><span className="font-semibold">Message:</span> {order.message}</p>}
          </div>

          {/* Cart Items */}
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Cart Items</h4>
            <div className="flex flex-wrap gap-4 mt-2">
              {order.cart.map((item, index) => (
                <div key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-full sm:w-[48%] flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{`${item.product.name}(${item.product.category})`}</span>
                  <span className="text-gray-600 dark:text-gray-300">Qty: {item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-4 border-t pt-4">
          <button
            onClick={toggleModal}
            className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
