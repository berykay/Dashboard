let hours;
let minutes;
let seconds;

export default function timeCalculator(time) {
  hours = Math.floor(time / 3600);
  minutes = Math.floor((time % 3600) / 60);
  seconds = Math.floor(time % 60);

  let formattedTime = '';
  if (hours > 0) {
    formattedTime += hours + '.';
    if (minutes >= 10)
      formattedTime += minutes + ' Hours';
    else
      formattedTime += '0' + minutes + ' Hours';
    return formattedTime;
  }
  else if (minutes > 0) {
    formattedTime += minutes + '.';
    formattedTime += seconds + ' Minutes';
    return formattedTime;
  }
  else if (seconds > 0)
    return formattedTime += seconds + ' Seconds';

  return 'LOADING...';
}
