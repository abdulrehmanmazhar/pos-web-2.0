type DateFilter =
  | string
  | { startOfMonth: string; endOfMonth: string }
  | { startOfYear: string; endOfYear: string }
  | "";

export function filterByDateRange<T extends { createdAt: string }>(
  dateFilter: DateFilter,
  items: T[]
): T[] {
  if (!dateFilter) return items;

  return items.filter(({ createdAt }) => {
    const createdDate = new Date(createdAt);

    if (typeof dateFilter === "string") {
      return createdDate.toISOString().split("T")[0] === dateFilter.split("T")[0];
    }

    if ("startOfMonth" in dateFilter) {
      return (
        createdDate >= new Date(dateFilter.startOfMonth) &&
        createdDate <= new Date(dateFilter.endOfMonth)
      );
    }

    if ("startOfYear" in dateFilter) {
      return (
        createdDate >= new Date(dateFilter.startOfYear) &&
        createdDate <= new Date(dateFilter.endOfYear)
      );
    }

    return true;
  });
}

const CHART_COLORS = [
  "rgba(99, 102, 241, 0.7)",
  "rgba(59, 130, 246, 0.7)",
  "rgba(16, 185, 129, 0.7)",
  "rgba(245, 158, 11, 0.7)",
  "rgba(239, 68, 68, 0.7)",
  "rgba(139, 92, 246, 0.7)",
  "rgba(236, 72, 153, 0.7)",
  "rgba(20, 184, 166, 0.7)",
];

export function getTopSellingProducts(
  products: any[],
  dateFilter: DateFilter,
  limit = 5
) {
  const totals = products
    .map((product) => {
      const sales = (product.productSale ?? []).filter((sale: any) => {
        if (!dateFilter) return true;
        const saleDate = new Date(sale.createdAt);
        if (typeof dateFilter === "string") {
          return saleDate.toISOString().split("T")[0] === dateFilter.split("T")[0];
        }
        if ("startOfMonth" in dateFilter) {
          return (
            saleDate >= new Date(dateFilter.startOfMonth) &&
            saleDate <= new Date(dateFilter.endOfMonth)
          );
        }
        if ("startOfYear" in dateFilter) {
          return (
            saleDate >= new Date(dateFilter.startOfYear) &&
            saleDate <= new Date(dateFilter.endOfYear)
          );
        }
        return true;
      });

      const sold = sales.reduce((sum: number, s: any) => sum + (s.sold ?? 0), 0);
      return { name: product.name, sold };
    })
    .filter((p) => p.sold > 0)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, limit);

  if (totals.length === 0) return null;

  return {
    labels: totals.map((p) => p.name),
    values: totals.map((p) => p.sold),
  };
}

export function getSalesByRoute(orders: any[], dateFilter: DateFilter) {
  const filtered = filterByDateRange(dateFilter, orders);
  const byRoute: Record<string, number> = {};

  filtered.forEach((order) => {
    const route = order.customerDetails?.route || "Unknown";
    const revenue = (order.price ?? 0) - (order.discount ?? 0);
    byRoute[route] = (byRoute[route] ?? 0) + revenue;
  });

  const entries = Object.entries(byRoute).filter(([, value]) => value > 0);
  if (entries.length === 0) return null;

  return {
    labels: entries.map(([route]) => route),
    values: entries.map(([, value]) => value),
  };
}

function bucketOrders(orders: any[], dateFilter: DateFilter) {
  if (typeof dateFilter === "string") {
    const buckets = Array.from({ length: 24 }, (_, h) => ({
      label: `${h.toString().padStart(2, "0")}:00`,
      count: 0,
    }));
    orders.forEach((order) => {
      const hour = new Date(order.createdAt).getHours();
      buckets[hour].count += 1;
    });
    return buckets;
  }

  if (dateFilter && "startOfMonth" in dateFilter) {
    const start = new Date(dateFilter.startOfMonth);
    const daysInMonth = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0
    ).getDate();
    const buckets = Array.from({ length: daysInMonth }, (_, i) => ({
      label: `${i + 1}`,
      count: 0,
    }));
    orders.forEach((order) => {
      const d = new Date(order.createdAt);
      if (d.getMonth() === start.getMonth() && d.getFullYear() === start.getFullYear()) {
        buckets[d.getDate() - 1].count += 1;
      }
    });
    return buckets;
  }

  if (dateFilter && "startOfYear" in dateFilter) {
    const year = new Date(dateFilter.startOfYear).getFullYear();
    const buckets = Array.from({ length: 12 }, (_, i) => ({
      label: new Date(year, i, 1).toLocaleString("default", { month: "short" }),
      count: 0,
    }));
    orders.forEach((order) => {
      const d = new Date(order.createdAt);
      if (d.getFullYear() === year) {
        buckets[d.getMonth()].count += 1;
      }
    });
    return buckets;
  }

  return null;
}

export function getOrdersOverTime(orders: any[], dateFilter: DateFilter) {
  const filtered = filterByDateRange(dateFilter, orders);
  const buckets = bucketOrders(filtered, dateFilter);
  if (!buckets) return null;

  const hasData = buckets.some((b) => b.count > 0);
  if (!hasData && filtered.length === 0) return null;

  return {
    labels: buckets.map((b) => b.label),
    values: buckets.map((b) => b.count),
  };
}

export function getPaymentsOverTime(orders: any[], dateFilter: DateFilter) {
  const filtered = filterByDateRange(dateFilter, orders);
  const buckets = bucketOrders(filtered, dateFilter);
  if (!buckets) return null;

  const payments = buckets.map(() => 0);
  const outstanding = buckets.map(() => 0);

  filtered.forEach((order) => {
    const created = new Date(order.createdAt);
    let index = -1;

    if (typeof dateFilter === "string") {
      index = created.getHours();
    } else if (dateFilter && "startOfMonth" in dateFilter) {
      index = created.getDate() - 1;
    } else if (dateFilter && "startOfYear" in dateFilter) {
      index = created.getMonth();
    }

    if (index < 0 || index >= payments.length) return;

    const bill = (order.price ?? 0) - (order.discount ?? 0);
    const paid = order.payment ?? 0;
    payments[index] += paid;
    outstanding[index] += Math.max(bill - paid, 0);
  });

  const hasData = payments.some((v) => v > 0) || outstanding.some((v) => v > 0);
  if (!hasData) return null;

  return {
    labels: buckets.map((b) => b.label),
    payments,
    outstanding,
  };
}

export function getStockValueByCategory(products: any[]) {
  const byCategory: Record<string, number> = {};

  products.forEach((product) => {
    const category = product.category || "Uncategorized";
    const purchasePrice =
      product.history?.[product.history.length - 1]?.purchasePrice ?? 0;
    const value = (product.stockQty ?? 0) * purchasePrice;
    byCategory[category] = (byCategory[category] ?? 0) + value;
  });

  const entries = Object.entries(byCategory).filter(([, value]) => value > 0);
  if (entries.length === 0) return null;

  return {
    labels: entries.map(([cat]) => cat),
    values: entries.map(([, value]) => Math.round(value)),
  };
}

export function getDeliveryStatus(orders: any[], dateFilter: DateFilter) {
  const filtered = filterByDateRange(dateFilter, orders);
  if (filtered.length === 0) return null;

  const delivered = filtered.filter((o) => o.deliveryStatus).length;
  const pending = filtered.length - delivered;
  if (delivered === 0 && pending === 0) return null;

  return {
    labels: ["Delivered", "Pending"],
    values: [delivered, pending],
  };
}

export function getHomeSummary(
  orders: any[],
  customers: any[],
  dateFilter: DateFilter
) {
  const filtered = filterByDateRange(dateFilter, orders);
  const revenue = filtered.reduce(
    (sum, o) => sum + ((o.price ?? 0) - (o.discount ?? 0)),
    0
  );
  const collected = filtered.reduce((sum, o) => sum + (o.payment ?? 0), 0);
  const pendingDeliveries = filtered.filter((o) => !o.deliveryStatus).length;
  const totalUdhar = customers.reduce((sum, c) => sum + (c.udhar ?? 0), 0);

  return {
    orderCount: filtered.length,
    revenue,
    collected,
    pendingDeliveries,
    totalUdhar,
    customerCount: customers.length,
  };
}

export function toBarChartData(labels: string[], values: number[]) {
  return {
    labels,
    datasets: [
      {
        label: "Value",
        data: values,
        backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: labels.map((_, i) =>
          CHART_COLORS[i % CHART_COLORS.length].replace("0.7", "1")
        ),
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };
}

export function toDonutChartData(labels: string[], values: number[]) {
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: labels.map((_, i) =>
          CHART_COLORS[i % CHART_COLORS.length].replace("0.7", "1")
        ),
        borderWidth: 1,
      },
    ],
  };
}

export function toLineChartData(
  labels: string[],
  values: number[],
  label = "Count"
) {
  return {
    labels,
    datasets: [
      {
        label,
        data: values,
        fill: true,
        tension: 0.3,
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointRadius: 3,
      },
    ],
  };
}

export function toMultiLineChartData(
  labels: string[],
  datasets: { label: string; values: number[]; color: string }[]
) {
  return {
    labels,
    datasets: datasets.map((ds) => ({
      label: ds.label,
      data: ds.values,
      fill: false,
      tension: 0.3,
      borderColor: ds.color,
      backgroundColor: ds.color.replace("1)", "0.2)"),
      pointRadius: 2,
    })),
  };
}
