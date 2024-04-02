 export const convertSecondsToTime = (seconds: number) =>{
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime
  }

  export function convertSecondsToHMS(seconds: any) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.round(seconds % 60);
  
    let result = '';
    if (hours > 0) {
      result += hours + 'hr ';
    }
    if (minutes > 0) {
      result += minutes + 'min ';
    }
    if (remainingSeconds > 0) {
      result += remainingSeconds + 'sec';
    }
  
    return result.trim();
  }
  