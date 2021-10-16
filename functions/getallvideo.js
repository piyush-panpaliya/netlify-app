const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  try {
    let avenger = await clientQuery.query(
       q.Paginate(q.Match(q.Index("getallvideo")))
    );
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};
