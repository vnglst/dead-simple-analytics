const data = require("@begin/data");
const parseBody = require("./parseBody");
const { VISITS_TABLE, getDateHash } = require("@architect/shared");

// check if this is the first time for this origin
async function initOrigin(origin) {
  const query = {
    table: VISITS_TABLE,
    key: await getDateHash(origin),
    url: origin,
    visits: 0,
  };

  const existing = await data.get(query);

  if (!existing) {
    await data.set(query);
  }
}

// increase visit count
async function incrOrigin(origin) {
  const query = {
    table: VISITS_TABLE,
    key: await getDateHash(origin),
    prop: "visits",
  };
  return await data.incr(query);
}

exports.handler = async function handleTrack(req) {
  const q = parseBody(req);
  let url = q.dl;
  let origin = new URL(url).origin;

  await initOrigin(origin);
  const { visits } = await incrOrigin(origin);

  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json; charset=utf8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ origin, visits }),
  };
};
