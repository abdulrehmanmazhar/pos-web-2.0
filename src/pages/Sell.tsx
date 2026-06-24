import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ChevronDown, ChevronRight, RefreshCw } from "lucide-react";
import { useGetAllProductsQuery } from "../redux/slices/inventoryApiSlice";
import { useGetAllCustomersQuery } from "../redux/slices/customersApiSlice";
import { selectCurrentInventories } from "../redux/slices/inventorySlice";
import { selectCurrentCustomers } from "../redux/slices/customersSlice";
import {
  useAddCartMutation,
  useAddOrderMutation,
  useAddOrderPaymentMutation,
} from "../redux/slices/orderApiSlice";
import { objectCollector } from "../utils/objectCollector";

type CartItem = { productId: string; qty: number };

function Sell() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [payment, setPayment] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refetch: refetchProducts, isFetching } = useGetAllProductsQuery(undefined);
  useGetAllCustomersQuery(undefined);

  const rawProducts = useSelector(selectCurrentInventories);
  const customers = useSelector(selectCurrentCustomers);

  const products = useMemo(
    () =>
      rawProducts.map((item) => ({
        id: item._id,
        name: item.name,
        category: item.category,
        salePrice: item.price,
        discount: item.discount ?? 0,
        currentStock: item.stockQty,
      })),
    [rawProducts]
  );

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const q = productSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  const categories = objectCollector(filteredProducts, "category");

  const selectedCustomer = customers.find((c) => c._id === selectedCustomerId);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) return customers;
    const q = customerSearch.toLowerCase();
    return customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.businessName?.toLowerCase().includes(q) ||
        c.contact?.toLowerCase().includes(q)
    );
  }, [customers, customerSearch]);

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.salePrice * item.qty : 0);
  }, 0);

  const totalDiscount = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.discount * item.qty : 0);
  }, 0);

  const grandTotal = Math.max(totalPrice - totalDiscount - additionalDiscount, 0);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleItemInCart = (productId: string) => {
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      setCart(cart.filter((item) => item.productId !== productId));
    } else {
      setCart([...cart, { productId, qty: 1 }]);
    }
  };

  const handleQuantityChange = (productId: string, qty: number) => {
    setCart(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, qty: Math.max(0, qty) }
          : item
      )
    );
  };

  const [addCart] = useAddCartMutation();
  const [addOrder] = useAddOrderMutation();
  const [addOrderPayment] = useAddOrderPaymentMutation();

  const resetForm = () => {
    setCart([]);
    setAdditionalDiscount(0);
    setMessage("");
    setPayment(0);
  };

  const handleCompleteSale = async () => {
    const activeCart = cart.filter((item) => item.qty > 0);

    if (!selectedCustomerId) {
      toast.error("Please select a customer");
      return;
    }
    if (activeCart.length === 0) {
      toast.error("Cannot proceed with an empty cart");
      return;
    }
    if (payment < 0) {
      toast.error("Payment cannot be negative");
      return;
    }
    if (payment > grandTotal) {
      toast.error("Payment cannot exceed the total bill");
      return;
    }

    setIsSubmitting(true);
    try {
      const cartResult = await addCart({
        id: selectedCustomerId,
        cart: activeCart,
      }).unwrap();

      const orderId = cartResult.order._id;

      await addOrder({
        id: orderId,
        message,
        deliveryDate,
        additionalDiscount,
      }).unwrap();

      await addOrderPayment({
        id: orderId,
        payment,
      }).unwrap();

      toast.success("Sale completed successfully");
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to complete sale");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">POS</h1>
        <button
          type="button"
          onClick={() => refetchProducts()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left: Customer + Products */}
        <div className="xl:col-span-2 space-y-4">
          {/* Customer selection */}
          <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Customer</h2>
            <input
              type="search"
              placeholder="Search customers..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full mb-3 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a customer</option>
              {filteredCustomers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} — {c.businessName} ({c.contact})
                </option>
              ))}
            </select>
            {selectedCustomer && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                <p><span className="font-medium">Shop:</span> {selectedCustomer.businessName}</p>
                <p><span className="font-medium">Contact:</span> {selectedCustomer.contact}</p>
                <p><span className="font-medium">Dues:</span> {selectedCustomer.udhar ?? 0} PKR</p>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Products</h2>
              <input
                type="search"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-64 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products found</p>
            ) : (
              categories.map((category) => {
                const productsInCategory = filteredProducts.filter(
                  (p) => p.category === category
                );
                const isExpanded = expandedCategories[category];

                return (
                  <div key={category} className="border rounded-lg mb-3 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center gap-2 bg-gray-100 px-4 py-3 font-medium text-left hover:bg-gray-200"
                    >
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      {category}
                      <span className="text-gray-500 text-sm ml-auto">
                        {productsInCategory.length} items
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-3 py-2 text-left">Name</th>
                              <th className="px-3 py-2 text-right">Price</th>
                              <th className="px-3 py-2 text-right">Stock</th>
                              <th className="px-3 py-2 text-center">Qty</th>
                              <th className="px-3 py-2 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productsInCategory.map((item, idx) => {
                              const isInCart = cart.some(
                                (c) => c.productId === item.id
                              );
                              const productInCart = cart.find(
                                (c) => c.productId === item.id
                              );

                              return (
                                <tr
                                  key={item.id}
                                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                  <td className="px-3 py-2">{item.name}</td>
                                  <td className="px-3 py-2 text-right">
                                    Rs. {item.salePrice}
                                  </td>
                                  <td className="px-3 py-2 text-right">
                                    {item.currentStock}
                                  </td>
                                  <td className="px-3 py-2 text-center">
                                    <input
                                      type="number"
                                      min="0"
                                      disabled={!isInCart}
                                      value={isInCart ? productInCart?.qty : 0}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.id,
                                          Number(e.target.value)
                                        )
                                      }
                                      className="w-16 p-1 text-center border rounded disabled:bg-gray-100"
                                    />
                                  </td>
                                  <td className="px-3 py-2 text-center">
                                    <button
                                      type="button"
                                      onClick={() => toggleItemInCart(item.id)}
                                      className={`px-3 py-1 rounded text-white text-xs font-medium ${
                                        isInCart
                                          ? "bg-red-500 hover:bg-red-600"
                                          : "bg-green-500 hover:bg-green-600"
                                      }`}
                                    >
                                      {isInCart ? "Remove" : "Add"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Checkout */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4 shadow-sm sticky top-0">
            <h2 className="text-lg font-semibold mb-4">Checkout</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product Discount</span>
                <span className="font-medium text-green-600">
                  - Rs. {totalDiscount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Additional Discount</span>
                <input
                  type="number"
                  min="0"
                  value={additionalDiscount}
                  onChange={(e) =>
                    setAdditionalDiscount(Number(e.target.value) || 0)
                  }
                  className="w-24 p-1 text-right text-sm border rounded"
                />
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total Bill</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Received (PKR)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={grandTotal}
                  value={payment}
                  onChange={(e) => setPayment(Number(e.target.value) || 0)}
                  className="flex-1 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPayment(grandTotal)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Full
                </button>
              </div>
              {payment < grandTotal && (
                <p className="text-xs text-amber-600 mt-1">
                  Remaining Rs. {grandTotal - payment} will be added to customer dues
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Order notes..."
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {cart.filter((c) => c.qty > 0).length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Cart ({cart.filter((c) => c.qty > 0).length} items)
                </p>
                <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
                  {cart
                    .filter((c) => c.qty > 0)
                    .map((item) => {
                      const product = products.find(
                        (p) => p.id === item.productId
                      );
                      return (
                        <li
                          key={item.productId}
                          className="flex justify-between text-gray-600"
                        >
                          <span>
                            {product?.name} x{item.qty}
                          </span>
                          <span>
                            Rs.{" "}
                            {(product?.salePrice ?? 0) * item.qty -
                              (product?.discount ?? 0) * item.qty}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={handleCompleteSale}
              disabled={isSubmitting}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 font-medium rounded-lg text-sm px-5 py-3"
            >
              {isSubmitting ? "Processing..." : "Complete Sale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sell;
