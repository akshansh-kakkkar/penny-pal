export function getCurrentMonthAndYear(){
    const now = new Date();
    return {
        month : now.getMonth() + 1,
        year : now.getFullYear()
    }
}