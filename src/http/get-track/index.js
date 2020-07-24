const data = require("@begin/data");
const { VISITS_TABLE, getDateHash } = require("@architect/shared");

exports.handler = async function handleTrack(req) {
  const { url, date } = req.queryStringParameters;
  const origin = new URL(url).origin;
  const parsedDate = new Date(date);

  const query = {
    table: VISITS_TABLE,
    key: await getDateHash(origin, parsedDate),
  };

  const existing = await data.get(query);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf8",
    },
    body: JSON.stringify(existing),
  };
};
