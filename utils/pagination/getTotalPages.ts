export const getTotalPages = (totalCount:number,limit:number):number => {
    return Math.ceil(totalCount / limit)
}