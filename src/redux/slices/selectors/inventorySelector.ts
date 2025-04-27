import { createSelector } from "reselect";
import { selectCurrentInventories, selectCurrentInventoriesDate, selectCurrentInventoriesMaxPages, selectCurrentInventoriesPageIndex, selectCurrentInventoriesRowsPerPage, selectCurrentInventoriesSearch } from "../inventorySlice";
import { paginator } from "../../../utils/paginator";
import { selectCurrentCustomerMaxPages, selectCurrentCustomerPageIndex, selectCurrentCustomerRowsPerPage } from "../customersSlice";

export const filteredInventories = createSelector([selectCurrentInventories, selectCurrentInventoriesSearch, selectCurrentInventoriesMaxPages, selectCurrentInventoriesPageIndex, selectCurrentInventoriesRowsPerPage, selectCurrentInventoriesDate], (inventories,search, maxPages, pageIndex, rowsPerPage, date)=>{
    const filteredList = search
    ? inventories.filter((user) =>
        Object.values(user).some(
       (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    : inventories;
    function filterByDateRange(
        dateFilter: string | { startOfMonth?: string; endOfMonth?: string; startOfYear?: string; endOfYear?: string },
        data: { createdAt: string; productSale: { createdAt: string }[] }[]
    ) {
        return data.map(item => ({
            ...item,
            productSale: item.productSale.filter(({ createdAt }) => {
                const createdDate = new Date(createdAt);
    
                if (typeof dateFilter === "string") {
                    return createdDate.toISOString().split("T")[0] === dateFilter.split("T")[0];
                } 
                
                if ("startOfMonth" in dateFilter) {
                    return createdDate >= new Date(dateFilter.startOfMonth!) && createdDate <= new Date(dateFilter.endOfMonth!);
                } 
                
                if ("startOfYear" in dateFilter) {
                    return createdDate >= new Date(dateFilter.startOfYear!) && createdDate <= new Date(dateFilter.endOfYear!);
                }
    
                return false;
            })
        }));
    }
    
    // Usage Example
    const filteredByDate = filterByDateRange(date, filteredList);
    
    const paginated = paginator(filteredByDate, Number(rowsPerPage));
    const requiredPage = paginated[pageIndex-1];
    return requiredPage?.map(item=>({
        id: item._id,
        name: item.name,
        category: item.category,
        stockStatus: item.inStock?'In Stock': 'Out of Stock',
        salePrice: item.price,
        purchasePrice: item.history[item.history.length-1]?.purchasePrice,
        discount: item.discount,
        sold: item.productSale?.reduce((acc, item)=>acc+item.sold,0) || 0,
        currentStock: item.stockQty,
        // stockValue: `${item.purchasePrice*item.stockQty} PKR`


        // createdBy: item.createdByUser?.name || "N/A",
    }))
})

