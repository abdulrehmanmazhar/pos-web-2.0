import { createSelector } from "reselect";
import { selectCurrentUsers, selectCurrentUsersMaxPages, selectCurrentUsersPageIndex, selectCurrentUsersRowsPerPage, selectCurrentUsersSearch } from "../userSlice";
import { paginator } from "../../../utils/paginator";

export const userSelector = createSelector([selectCurrentUsers, selectCurrentUsersSearch, selectCurrentUsersMaxPages, selectCurrentUsersPageIndex, selectCurrentUsersRowsPerPage], (users,search, maxPages, pageIndex, rowsPerPage)=>{
        const filteredList = search
          ? users.filter((user) =>
              Object.values(user).some(
                (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(search.toLowerCase())
              )
            )
          : users;
    
          const paginated = paginator(filteredList, Number(rowsPerPage));
          const requiredPage = paginated[pageIndex-1];
        //   console.log(requiredPage);
    return requiredPage?.map(item=>({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        isVerified: item.isVerified?'verified': 'not verified',
        routes: item.routes.join(",")

    }))
})