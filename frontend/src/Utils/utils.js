
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
  }

  export {convertDate}