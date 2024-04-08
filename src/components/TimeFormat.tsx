export const convertSecondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  return formattedTime;
};

export function convertSecondsToHMS(seconds: any) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = Math.round(seconds % 60);

  let result = "";
  if (hours > 0) {
    result += hours + "hr ";
  }
  if (minutes > 0) {
    result += minutes + "min ";
  }
  if (remainingSeconds > 0) {
    result += remainingSeconds + "sec";
  }

  return result.trim();
}

export function getTimeDifference(timestamp: any) {
  const currentDate: any = new Date();
  const pastDate: any = new Date(timestamp);

  const difference = currentDate - pastDate;

  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInWeek = millisecondsInDay * 7;
  const millisecondsInMonth = millisecondsInDay * 30;
  const millisecondsInYear = millisecondsInDay * 365;

  if (difference < millisecondsInMinute) {
    const secondsAgo = Math.floor(difference / 1000);
    return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
  } else if (difference < millisecondsInHour) {
    const minutesAgo = Math.floor(difference / millisecondsInMinute);
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  } else if (difference < millisecondsInDay) {
    const hoursAgo = Math.floor(difference / millisecondsInHour);
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  } else if (difference < millisecondsInWeek) {
    const daysAgo = Math.floor(difference / millisecondsInDay);
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  } else if (difference < millisecondsInMonth) {
    const weeksAgo = Math.floor(difference / millisecondsInWeek);
    return `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
  } else if (difference < millisecondsInYear) {
    const monthsAgo = Math.floor(difference / millisecondsInMonth);
    return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(difference / millisecondsInYear);
    return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
  }
}

export function formatEnrollDate(inputDate: string): string {
  const date = new Date(inputDate);

  const monthNames: string[] = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];
  const year: number = date.getFullYear();
  const monthIndex: number = date.getMonth(); 
  const day: number = date.getDate();
  const formattedDate: string = `${monthNames[monthIndex]} ${day}, ${year}`;
  return formattedDate;
}



