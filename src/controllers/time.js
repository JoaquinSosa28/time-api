exports.getTime = async (req, res) => {

  const { hours, days, gmt = 0 } = req.query;
  const millisPerHour = 3600000;

  let [fromDays, toDays] = days.split("-"); 
  let [fromHours, toHours] = hours.split("-");
  if (toDays === undefined) {toDays = fromDays}
  if (toHours === undefined) {toHours = fromHours}
  // toDays ? toDays : fromDays

  // Parse gmt into Number if it can be parsed, otherwise use 0
  const today = new Date(Date.now() + millisPerHour * gmt)
  let todayHour = today.getHours() + 3
  const appliesDays = today.getDay() >= fromDays && today.getDay() <= toDays;
  const appliesHours = todayHour >= fromHours && todayHour <= toHours;

  res.sendStatus(appliesDays && appliesHours ? 204 : 418);  
};
