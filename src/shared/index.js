const hasha = require("hasha");

module.exports.VISITS_TABLE = "visits";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return day + "-" + month + "-" + year;
}

module.exports.getDateHash = async function getDateHash(
  str,
  date = new Date()
) {
  const dateStr = getFormattedDate(date);
  return hasha(str + dateStr, { algorithm: "md5" });
};
