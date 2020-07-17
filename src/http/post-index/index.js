const data = require("@begin/data");
const hasha = require("hasha");
let arc = require("@architect/functions");
let parseBody = arc.http.helpers.bodyParser;

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

async function http(req) {
  let { url, title } = parseBody(req);

  await initUrl(url, title);

  const { visits } = await incrUrl(url, title);

  return {
    statusCode: 201,
    headers: {
      "content-type": "application/json; charset=utf8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    cors: true,
    body: JSON.stringify({ title, url, visits }),
  };
}

exports.handler = arc.http.async(http);
