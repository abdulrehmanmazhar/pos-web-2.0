import { useMemo, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import {
  BarChart,
  LineChart,
  DonutChart,
  MultiLineChart,
} from "../components/Charts";
import { useGetAllOrdersQuery } from "../redux/slices/orderApiSlice";
import { useGetAllProductsQuery } from "../redux/slices/inventoryApiSlice";
import { useGetAllCustomersQuery } from "../redux/slices/customersApiSlice";
import { selectCurrentOrders } from "../redux/slices/orderSlice";
import { selectCurrentInventories } from "../redux/slices/inventorySlice";
import { selectCurrentCustomers } from "../redux/slices/customersSlice";
import {
  getTopSellingProducts,
  getSalesByRoute,
  getOrdersOverTime,
  getPaymentsOverTime,
  getStockValueByCategory,
  getDeliveryStatus,
  getHomeSummary,
  toBarChartData,
  toDonutChartData,
  toLineChartData,
  toMultiLineChartData,
} from "../utils/homeChartData";

function ChartCard({
  title,
  subtitle,
  colSpan,
  setDate,
  showFilter = true,
  children,
}: {
  title: string;
  subtitle?: string;
  colSpan: string;
  setDate?: (d: any) => void;
  showFilter?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${colSpan} bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && (
        <p className="text-xs text-indigo-600/80 mb-1">{subtitle}</p>
      )}
      {showFilter && setDate && <Filter setDate={setDate} />}
      <div className="h-[300px] w-full bg-white rounded-lg p-2">{children}</div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-indigo-800 mt-1">
        {value}
        {suffix && <span className="text-sm font-medium ml-1">{suffix}</span>}
      </p>
    </div>
  );
}

function Home() {
  useGetAllOrdersQuery(undefined);
  useGetAllProductsQuery(undefined);
  useGetAllCustomersQuery(undefined);

  const orders = useSelector(selectCurrentOrders);
  const products = useSelector(selectCurrentInventories);
  const customers = useSelector(selectCurrentCustomers);

  const [summaryDate, setSummaryDate] = useState<any>("");
  const [topProductsDate, setTopProductsDate] = useState<any>("");
  const [salesByRouteDate, setSalesByRouteDate] = useState<any>("");
  const [ordersTimeDate, setOrdersTimeDate] = useState<any>("");
  const [paymentsDate, setPaymentsDate] = useState<any>("");
  const [deliveryDate, setDeliveryDate] = useState<any>("");

  const summary = useMemo(
    () => getHomeSummary(orders, customers, summaryDate),
    [orders, customers, summaryDate]
  );

  const topProducts = useMemo(() => {
    const result = getTopSellingProducts(products, topProductsDate);
    return result ? toBarChartData(result.labels, result.values) : null;
  }, [products, topProductsDate]);

  const salesByRoute = useMemo(() => {
    const result = getSalesByRoute(orders, salesByRouteDate);
    return result ? toDonutChartData(result.labels, result.values) : null;
  }, [orders, salesByRouteDate]);

  const ordersOverTime = useMemo(() => {
    const result = getOrdersOverTime(orders, ordersTimeDate);
    return result
      ? toLineChartData(result.labels, result.values, "Orders")
      : null;
  }, [orders, ordersTimeDate]);

  const paymentsOverTime = useMemo(() => {
    const result = getPaymentsOverTime(orders, paymentsDate);
    return result
      ? toMultiLineChartData(result.labels, [
          {
            label: "Collected (PKR)",
            values: result.payments,
            color: "rgba(16, 185, 129, 1)",
          },
          {
            label: "Outstanding (PKR)",
            values: result.outstanding,
            color: "rgba(239, 68, 68, 1)",
          },
        ])
      : null;
  }, [orders, paymentsDate]);

  const stockByCategory = useMemo(() => {
    const result = getStockValueByCategory(products);
    return result ? toBarChartData(result.labels, result.values) : null;
  }, [products]);

  const deliveryStatus = useMemo(() => {
    const result = getDeliveryStatus(orders, deliveryDate);
    return result ? toDonutChartData(result.labels, result.values) : null;
  }, [orders, deliveryDate]);

  const charts = [
    topProducts && {
      key: "top-products",
      title: "Top Selling Products",
      subtitle: "Units sold in selected period",
      colSpan: "col-span-1 md:col-span-1 xl:col-span-1",
      date: topProductsDate,
      setDate: setTopProductsDate,
      chart: (
        <BarChart
          data={{ ...topProducts, datasets: [{ ...topProducts.datasets[0], label: "Units sold" }] }}
        />
      ),
    },
    salesByRoute && {
      key: "sales-route",
      title: "Revenue by Route",
      subtitle: "Order value after discount",
      colSpan: "col-span-1 md:col-span-1 xl:col-span-1",
      date: salesByRouteDate,
      setDate: setSalesByRouteDate,
      chart: <DonutChart data={salesByRoute} />,
    },
    ordersOverTime && {
      key: "orders-time",
      title: "Orders Over Time",
      subtitle: "Order count by hour, day, or month",
      colSpan: "col-span-1 md:col-span-2 xl:col-span-1",
      date: ordersTimeDate,
      setDate: setOrdersTimeDate,
      chart: <LineChart data={ordersOverTime} />,
    },
    paymentsOverTime && {
      key: "payments",
      title: "Payments vs Outstanding",
      subtitle: "Collected vs remaining balance",
      colSpan: "col-span-1 md:col-span-1 xl:col-span-1",
      date: paymentsDate,
      setDate: setPaymentsDate,
      chart: <MultiLineChart data={paymentsOverTime} />,
    },
    stockByCategory && {
      key: "stock",
      title: "Stock Value by Category",
      subtitle: "Current inventory at purchase price",
      colSpan: "col-span-1 md:col-span-2 xl:col-span-2",
      showFilter: false,
      chart: (
        <BarChart
          data={{
            ...stockByCategory,
            datasets: [{ ...stockByCategory.datasets[0], label: "Value (PKR)" }],
          }}
        />
      ),
    },
    deliveryStatus && {
      key: "delivery",
      title: "Delivery Status",
      subtitle: "Delivered vs pending orders",
      colSpan: "col-span-1 md:col-span-1 xl:col-span-1",
      date: deliveryDate,
      setDate: setDeliveryDate,
      chart: <DonutChart data={deliveryStatus} />,
    },
  ].filter(Boolean) as {
    key: string;
    title: string;
    subtitle: string;
    colSpan: string;
    setDate?: (d: any) => void;
    showFilter?: boolean;
    chart: ReactNode;
  }[];

  return (
    <div className="p-4 space-y-4">
      {/* Summary strip */}
      <div className="bg-gradient-to-tr from-indigo-200 to-indigo-100 rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-indigo-800">Overview</h2>
        </div>
        <Filter setDate={setSummaryDate} />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mt-2">
          <SummaryCard label="Orders" value={summary.orderCount} />
          <SummaryCard
            label="Revenue"
            value={summary.revenue.toLocaleString()}
            suffix="PKR"
          />
          <SummaryCard
            label="Collected"
            value={summary.collected.toLocaleString()}
            suffix="PKR"
          />
          <SummaryCard label="Pending Deliveries" value={summary.pendingDeliveries} />
          <SummaryCard label="Customers" value={summary.customerCount} />
          <SummaryCard
            label="Total Udhar"
            value={summary.totalUdhar.toLocaleString()}
            suffix="PKR"
          />
        </div>
      </div>

      {charts.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No chart data available yet. Add orders, products, or sales to see
          insights here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {charts.map((item) => (
            <ChartCard
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              colSpan={item.colSpan}
              setDate={item.setDate}
              showFilter={item.showFilter}
            >
              {item.chart}
            </ChartCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
