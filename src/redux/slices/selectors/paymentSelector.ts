import { createSelector } from "reselect";
import { selectCurrentOrders } from "../orderSlice";
import { 
    selectCurrentPaymentsDate, 
    selectCurrentPaymentsPageIndex, 
    selectCurrentPaymentsRowsPerPage, 
    selectCurrentPaymentsSearch 
} from "../paymentSlice";
import { paginator } from "../../../utils/paginator";

const filterByDateRange = (dateFilter, data) => {
    return data.filter(({ createdAt }) => {
        const createdDate = new Date(createdAt);

        if (typeof dateFilter === "string") {
            return createdDate.toISOString().split("T")[0] === dateFilter.split("T")[0];
        } 

        if (dateFilter?.startOfMonth) {
            return createdDate >= new Date(dateFilter.startOfMonth) && createdDate <= new Date(dateFilter.endOfMonth);
        } 
        
        if (dateFilter?.startOfYear) {
            return createdDate >= new Date(dateFilter.startOfYear) && createdDate <= new Date(dateFilter.endOfYear);
        }

        return false;
    });
};

export const filteredPayments = createSelector(
    [
        selectCurrentOrders, 
        selectCurrentPaymentsSearch, 
        selectCurrentPaymentsDate, 
        selectCurrentPaymentsPageIndex, 
        selectCurrentPaymentsRowsPerPage
    ],
    (orders, search, date, pageIndex, rowsPerPage) => {
        // Filter payments with outstanding balance
        let filteredList = orders.filter(item => (item.payment ?? item.price) < item.price);
        
        // Apply search filtering
        if (search) {
            filteredList = filteredList.filter(order =>
                [
                    order.customerDetails?.name,   // Name of the customer
                    order.userDetails?.name,       // Created by (user who created the order)
                    order.customerDetails?.contact, // Contact number
                    String(order.orderNumber)       // Order number (convert to string)
                ].some(value => 
                    value && value.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        // Apply date filtering
        if (date) {
            filteredList = filterByDateRange(date, filteredList);
        }

        // Paginate results
        const paginatedResults = paginator(filteredList, Number(rowsPerPage));
        const requiredPage = paginatedResults[pageIndex - 1] || [];

        // Format data for UI
        return requiredPage.map(item => ({
            id: item._id,
            index: item.orderNumber,
            customer: item.customerDetails?.name ?? "Unknown",
            cart: item.cart,
            createdAt: new Date(item.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }),
            createdBy: item.userDetails?.name ?? "Unknown",
            customerDetail: item.customerDetails,
            deliveryDate: new Date(item.deliveryDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }),
            deliveryStatus: item.deliveryStatus ? 'delivered' : 'pending',
            discount: item.discount ?? 0,
            message: item.message ?? "",
            price: item.price ?? 0,
            payment: item.payment ?? "Nil",
            left: (item.price ?? 0) - (item.discount ?? 0) - (item.payment ?? 0),
            route: item.customerDetails?.route ?? "Unknown"
        }));
    }
);
