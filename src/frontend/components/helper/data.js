export const data = [ {
    id: 1,
    name :   "Cohort 1",
    date:"null"
    
},
{
    id: 2,
    name :   "Cohort 2",
    date:"null" 

},
{
    id: 3,
    name :   "Cohort 3",
    date:"null" 


},
{
    id: 4,
    name :   "Cohort 4",
    date:"null" 

}]


//convert unix time to normal time
export function unixTimeToNormalTime(unixTime) {
    const date = new Date(Number(unixTime/BigInt(1000000)))
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format the date and time as desired
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedTime;
  }