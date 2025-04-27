import { createSelector } from "reselect";
import { selectCurrentTargets } from "../targetSlice";
export const targetSelector = createSelector([selectCurrentTargets],(targets)=>{
    return targets
    .map(item=>({
        id: item._id,
        userName: item.userId.name,
        type: item.type,
        product: item?.productId?.name ? `${item.productId.name} (${item.productId.category || 'Unknown Category'})` : 'Nil',
        value: item.value,
        progress: item?.progress ? `${item.progress}` : 'Nil',
        startDate: new Date(item.startDate).toLocaleString('en-GB',{ year: 'numeric', month: 'short', day: '2-digit' }),
        endDate: new Date(item.endDate).toLocaleString('en-GB',{ year: 'numeric', month: 'short', day: '2-digit' }),

    }))
})