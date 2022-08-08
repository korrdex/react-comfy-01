//domain/.netlify/functions/wrld

exports.handler = async function (e, context) {
  return {
    statusCode: 200,
    body: "hello react comfy",
  };
};
