const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  try {
    let avenger = await clientQuery.query(
      q.Select(["data","link"],q.Get(q.Match(q.Index("linkbyid"), data.vid)))
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};


