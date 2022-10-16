/**
 * Direction
 * Get name of the day of 4 days ago from today
 *
 * Expected result:
 * 1. if date now = monday
 * 2. then result = thursday
 */
function result() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const monday = new Date(today.setDate(first));
  
  let date = new Date();
      date.setDate(date.getDate(monday) + 4);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(date);
  const dayName = days[d.getDay()];
  return dayName
  // write your code here
}

console.log(result());
