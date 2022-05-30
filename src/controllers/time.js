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
    return date.getTime();
  },
  pretty: (date) => {
    return (
      date.toLocaleDateString("es-AR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }) + " hs"
    );
  },
};

exports.getTime = async (req, res) => {
  const { date = Date.now(), format, offset = 0 } = req.query;

  const resDate = new Date(
    new Date(Number(date) || date) + MILLIS_PER_HOUR * offset
  );
  if (!resDate) return res.status(500).json({ message: "Invalid date" });
  if (!formats[format])
    return res.status(500).json({ message: "Invalid format" });

  res.json({ date: formats[format](resDate) });
};
