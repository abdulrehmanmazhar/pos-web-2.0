import { createSelector } from "reselect";
import { selectCurrentCustomers, selectCurrentCustomerSearch, selectCurrentCustomerMaxPages, selectCurrentCustomerPageIndex, selectCurrentCustomerRowsPerPage, selectCurrentCustomerRoute } from "../customersSlice";
import { paginator } from "../../../utils/paginator";

export const filteredCustomers = createSelector(
  [selectCurrentCustomers, selectCurrentCustomerSearch, selectCurrentCustomerMaxPages, selectCurrentCustomerPageIndex,selectCurrentCustomerRowsPerPage, selectCurrentCustomerRoute],
  (customers, search, maxPages, pageIndex, rowsPerPage, route) => {


    // Always map the customers, but filter if there's a search query
    const filteredList = search
      ? customers.filter((customer) =>
          Object.values(customer).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(search.toLowerCase())
          )
        )
      : customers;

            const RouteFiltered = filteredList.filter((item)=>{
        if (!route || !item.route) return item; // Handles null/undefined cases
        
        return item?.route === route;
      })

      const paginated = paginator(RouteFiltered, Number(rowsPerPage));
      const requiredPage = paginated[pageIndex-1];
    //   console.log(requiredPage);

    return requiredPage?.map((item) => ({
      id: item._id,
      name: item.name,
      businessName: item.businessName,
      contact: item.contact,
      address: item.address,
      udhar: item.udhar === undefined ? 'Nil' : item.udhar,
      route: item.route,
      createdBy: item.createdByUser?.name || "N/A",
    }));
  }
);
