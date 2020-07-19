const data = require("@begin/data");
const hasha = require("hasha");
const parseBody = require("./parseBody");
// let arc = require("@architect/functions");

const TABLE = "urls";

async function getHash(str) {
  return hasha(str, { algorithm: "md5" });
}

// check if this is the first time for this url
async function initUrl(url, title) {
  const query = {
    table: TABLE,
    key: await getHash(url),
    url,
    title,
    visits: 0,
  };

  const existing = await data.get(query);

  if (!existing) {
    await data.set(query);
  }
}

// increase visit count
async function incrUrl(url) {
  const query = { table: TABLE, key: await getHash(url), prop: "visits" };
  return await data.incr(query);
}

exports.handler = async function handleTrack(req) {
  const q = parseBody(req);
  let url = q.dl;
  let title = q.dt;

  console.log("handleTrack -> url", url);
  console.log("handleTrack -> title", title);

  await initUrl(url, title);
  const { visits } = await incrUrl(url, title);

  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json; charset=utf8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ title, url, visits }),
  };
};
