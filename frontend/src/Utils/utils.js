const convertDate = (createdAt) => {
  const date = new Date(createdAt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedDate = `${month} ${day}, ${year} at ${hours %
    12}:${minutes} ${ampm}`;

  return formattedDate;
};

const getDaysSinceCreatedAt  = (createdAt) => {
  const oneMinuteInMs = 60 * 1000;
  const oneHourInMs = 60 * oneMinuteInMs;
  const oneDayInMs = 24 * oneHourInMs;
  const oneWeekInMs = 7 * oneDayInMs;
  const oneMonthInMs = 30 * oneDayInMs;
  const oneYearInMs = 365 * oneDayInMs;
  
  const createdAtDate = new Date(createdAt);
  const timeDifferenceInMs = Date.now() - createdAtDate.getTime();
  
  if (timeDifferenceInMs < oneMinuteInMs) {
    return 'just now';
  } else if (timeDifferenceInMs < oneHourInMs) {
    const minutesAgo = Math.floor(timeDifferenceInMs / oneMinuteInMs);
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifferenceInMs < oneDayInMs) {
    const hoursAgo = Math.floor(timeDifferenceInMs / oneHourInMs);
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifferenceInMs < oneWeekInMs) {
    const daysAgo = Math.floor(timeDifferenceInMs / oneDayInMs);
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifferenceInMs < oneMonthInMs) {
    const weeksAgo = Math.floor(timeDifferenceInMs / oneWeekInMs);
    return `${weeksAgo} week${weeksAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifferenceInMs < oneYearInMs) {
    const monthsAgo = Math.floor(timeDifferenceInMs / oneMonthInMs);
    return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInMs / oneYearInMs);
    return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
  }
}

function generateCreatedAtText() {
  const now = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedDate = `${month} ${day}, ${year} at ${hours %
    12}:${minutes} ${ampm}`;

  return formattedDate;
}

const colors = ["#ebfcf7","#ebf4fc","#ebf4fc","#f6ebfc"]
const getPastelColor = () =>{
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // return randomColor
  return "#dfecf7"

}
export { convertDate, generateCreatedAtText, getDaysSinceCreatedAt, getPastelColor as getRandomPastelColor};
