const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);

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