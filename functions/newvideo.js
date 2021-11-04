const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');
const rateLimit = require("lambda-rate-limiter")({
  interval: 60 * 1000 // Our rate-limit interval, one minute
}).check;

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  try{
    await rateLimit(10, event.headers["client-ip"]);

  } catch (error) {
    return { statusCode: 429 }; // Still returning a basic 429, but we could do anything~
  }
  try {
    let avenger = await clientQuery.query(
      q.Create(
          q.Collection("video"),
          {
            data: {
              name: data.name,
              link: data.link,
              fb: 0,
              vid:q.NewId()
          }}
        )
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};
