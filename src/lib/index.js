export const monthsName = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

export const formatNetWorth = (total, current) => {
  let { month, value } = current;
  month = new Date(month);
  month = `${monthsName[month.getMonth()]}-${month.getFullYear()}`;
  if (total.length === 0) {
    const change = 'N/A';
    const changePercent = 'N/A';
    return [{month, value, change, changePercent}];
  }
  else {
    const prevValue = total[total.length-1].value;
    const change = value - prevValue;
    const changePercent = Math.round(((change/value) * 100)*100) / 100;
    return [...total, {month, value, change, changePercent}]
  }
};
