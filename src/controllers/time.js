const MILLIS_PER_HOUR = 3600000;

exports.getTimeCheck = async (req, res) => {
  let { hours, days, offset = 0 } = req.query;

  const today = new Date(Date.now() + MILLIS_PER_HOUR * offset);
  const todayHour = today.getHours();
  const todayDay = today.getDay();

  let [fromDays = todayDay, toDays] = (days || `${todayDay}`).split("-");
  let [fromHours, toHours] = (hours || `0-23`).split("-");
  !toDays && (toDays = fromDays);
  !toHours && (toHours = fromHours);

  const appliesDays = todayDay >= fromDays && todayDay <= toDays;
  const appliesHours = todayHour >= fromHours && todayHour <= toHours;

  res.sendStatus(appliesDays && appliesHours ? 204 : 418);
};

const formats = {
  timestamp: (date) => {
    //1231289738912
    return date;
  },
  pretty: (date) => {
    // return (
    //     date.toLocaleDateString("es-AR", {
    //       year: "2-digit",
    //       month: "2-digit",
    //       day: "2-digit",
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     }) + " hs"
    //   );
  },
};

exports.getTime = async (req, res) => {
  const { from = Date.now(), format, offset } = req.query;
  const today = new Date(new Date(from).getTime() + MILLIS_PER_HOUR * offset);
  if (!today) return res.status(500).json({ message: "Invalid date" });
  if (!formats[format]) return res.status(500).json({ message: "Invalid format" });

  //1231238908
  //05/10/02 15:32 hs

  res.json({ date: "DATE GOES HERE" });
};
