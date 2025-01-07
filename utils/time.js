function formatDateToWIB(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okr",
    "Nov",
    "Des",
  ];

  let day = date.getDate().toString().padStart(2, "0");

  let month = months[date.getMonth()];

  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");

  let minutes = date.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000);
  //   console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return `Durasi : ${diffInSeconds} second${
      diffInSeconds > 1 ? "s" : ""
    } ago`;
  }
  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Durasi : ${diffInMinutes} minute${
      diffInMinutes > 1 ? "s" : ""
    } ago`;
  }
  let diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours${diffInHours > 1 ? "s" : ""}  ago`;
  }
  let diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  let diffInMonth = Math.floor(diffInDays / 30);
  return `${diffInMonth} monts${diffInMonth > 1 ? "s" : ""} ago`;
}

module.exports = {
  formatDateToWIB,
  getRelativeTime,
};
