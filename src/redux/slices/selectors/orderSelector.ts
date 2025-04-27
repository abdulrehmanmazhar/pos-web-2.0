import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { selectCurrentOrders, selectCurrentOrdersCreatedBySearch, selectCurrentOrdersDate, selectCurrentOrdersDeliveryDateSearch, selectCurrentOrdersMaxPages, selectCurrentOrdersPageIndex, selectCurrentOrdersRouteSearch, selectCurrentOrdersRowsPerPage, selectCurrentOrdersSearch, setOrdersMaxPage } from "../orderSlice";
import { paginator } from "../../../utils/paginator";

const maxPageSync = (data)=>{
    const dispatch = useDispatch();
    dispatch(setOrdersMaxPage(data))
}

export const filteredOrders = createSelector([selectCurrentOrders, selectCurrentOrdersSearch, selectCurrentOrdersMaxPages, selectCurrentOrdersPageIndex, selectCurrentOrdersRowsPerPage, selectCurrentOrdersDate, selectCurrentOrdersDeliveryDateSearch, selectCurrentOrdersCreatedBySearch, selectCurrentOrdersRouteSearch], (orders,search, maxPages, pageIndex, rowsPerPage, date, deliveryDate, createdBy, route)=>{
    const filteredList = search
    ? orders.filter((order) =>
        [
          order.customerDetails?.name,   // Name of the customer
          order.userDetails?.name,       // Created by (user who created the order)
          order.customerDetails?.contact, // Contact number
          String(order.orderNumber)       // Order number (convert to string)
        ].some(value => 
          value && value.toLowerCase().includes(search.toLowerCase())
        )
      )
    : orders;
  
    
     function filterByDateRange(dateFilter: string | { startOfMonth?: string; endOfMonth?: string; startOfYear?: string; endOfYear?: string }, data: { createdAt: string }[]) {
        // console.log(dateFilter);
        return data.filter(({ createdAt }) => {
            const createdDate = new Date(createdAt);
    
            if (typeof dateFilter === "string") {
                // Exact match for a specific day
                return createdDate.toISOString().split("T")[0] === dateFilter.split("T")[0];
            } 
            
            if ("startOfMonth" in dateFilter) {
                // Range-based filtering for month
                return createdDate >= new Date(dateFilter.startOfMonth!) && createdDate <= new Date(dateFilter.endOfMonth!);
            } 
            
            if ("startOfYear" in dateFilter) {
                // Range-based filtering for year
                return createdDate >= new Date(dateFilter.startOfYear!) && createdDate <= new Date(dateFilter.endOfYear!);
            }
    
            return false;
        });
    }
    const filteredByDate = filterByDateRange(date, filteredList);

    const DeliveryFiltered = filteredByDate.filter((item) => {
        if (!deliveryDate || !item.deliveryDate) return item; // Handles null/undefined cases
        
        return item.deliveryDate.split("T")[0] === deliveryDate;
      });

      const CreatorFiltered = DeliveryFiltered.filter((item)=>{
        if (!createdBy || !item.userDetails.name) return item; // Handles null/undefined cases
        
        return item.userDetails.name === createdBy;
      })

      const RouteFiltered = CreatorFiltered.filter((item)=>{
        if (!route || !item.customerDetails.route) return item; // Handles null/undefined cases
        
        return item.customerDetails?.route === route;
      })

    
    
    const paginated = paginator(RouteFiltered, Number(rowsPerPage));
    // maxPageSync(paginated?.length || 1)
    const requiredPage = paginated[pageIndex-1];
    return requiredPage?.map(item=>({
        id: item._id,
        index: item.orderNumber,
        customer: item.customerDetails.name,
        cart: item.cart,
        createdAt: new Date(item.createdAt).toLocaleString('en-GB',{ year: 'numeric', month: 'short', day: '2-digit' }),
        createdBy: item.userDetails.name,
        customerDetail: item.customerDetails,
        devliveryDate: new Date(item.deliveryDate).toLocaleString('en-GB',{ year: 'numeric', month: 'short', day: '2-digit' }),
        deliveryStatus: item.deliveryStatus?'delivered': 'pending',
        discount: item.discount,
        message: item.message,
        price: item.price,
        payment: item.payment === undefined ? 'Nil' : item.payment,
        route: item.customerDetails?.route || 'unknown'
    }))
})