exports.getTime = async (req, res) => {

  let { hours, days, gmt = 0 } = req.query;
  const millisPerHour = 3600000;

  let [fromDays, toDays] = days.split("-"); 
  let [fromHours, toHours] = hours.split("-");
  toDays ? toDays = toDays : toDays = fromDays
  toHours ? toHours = toHours : toHours = fromHours

  // Parse gmt into Number if it can be parsed, otherwise use 0

  let gmtHour
  // !gmt.includes("-") && (gmt = `+${gmt}`)
  gmt.includes(`-`) ? gmtHour =`GMT+${gmt}:00` :  

  const today = new Date(`${new Date().toUTCString()} ${gmt}`);
  
  let todayHour = today.getHours()
  const appliesDays = today.getDay() >= fromDays && today.getDay() <= toDays;
  const appliesHours = todayHour >= fromHours && todayHour <= toHours;
  

  console.log(today.getHours())


  res.sendStatus(appliesDays && appliesHours ? 204 : 418);  
};
