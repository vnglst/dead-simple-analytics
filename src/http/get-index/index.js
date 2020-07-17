function checkOrigin() {
  return true;
}

exports.handler = async (req) => {
  // if (req.httpMethod == "OPTIONS") {
  // compare to allowed origins, if it exists, then return origin, if not - return false
  const origin = checkOrigin(req);
  if (origin === false) {
    return { statusCode: 403 };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 86400,
      },
    };
  }
  // } else {
  // return { statusCode: 503 };
  // }
};
