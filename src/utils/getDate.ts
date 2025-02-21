export function getDate(type: string, value: string | number) {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    // console.log(type, value)

    if (type === "day") {
        // console.log(new Date(year, currentDate.getMonth(), Number(value),12).toISOString())
        return new Date(year, currentDate.getMonth(), Number(value),12).toISOString();
    } 
    
    if (type === "month") {
        const monthIndex = new Date(`${value} 1, ${year}`).getMonth();
        return {
            startOfMonth: new Date(year, monthIndex, 1).toISOString(),
            endOfMonth: new Date(year, monthIndex + 1, 0, 23, 59, 59, 999).toISOString(),
        };
    } 
    
    if (type === "year") {
        const numericYear = Number(value);
        return {
            startOfYear: new Date(numericYear, 0, 1).toISOString(),
            endOfYear: new Date(numericYear, 11, 31, 23, 59, 59, 999).toISOString(),
        };
    }

    throw new Error("Invalid type. Must be 'day', 'month', or 'year'.");
}
