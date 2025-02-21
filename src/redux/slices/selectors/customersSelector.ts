import { createSelector } from "reselect";
import { selectCurrentCustomers, selectCurrentCustomerSearch, selectCurrentCustomerMaxPages, selectCurrentCustomerPageIndex, selectCurrentCustomerRowsPerPage } from "../customersSlice";
import { paginator } from "../../../utils/paginator";

export const filteredCustomers = createSelector(
  [selectCurrentCustomers, selectCurrentCustomerSearch, selectCurrentCustomerMaxPages, selectCurrentCustomerPageIndex,selectCurrentCustomerRowsPerPage],
  (customers, search, maxPages, pageIndex, rowsPerPage) => {


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

      const paginated = paginator(filteredList, Number(rowsPerPage));
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
