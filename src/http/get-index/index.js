const data = require("@begin/data");
const hasha = require("hasha");

const TABLE = "urls";
const URL = "http://localhost:3000/";

async function getHash(str) {
  return hasha(str, { algorithm: "md5" });
}

exports.handler = async function handleTrack(req) {
  const query = {
    table: TABLE,
    key: await getHash(URL),
  };

  const existing = await data.get(query);
  console.log(existing);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf8",
    },
    body: JSON.stringify(existing),
  };
};
