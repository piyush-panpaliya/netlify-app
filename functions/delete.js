const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  try {
    let avenger = await clientQuery.query(
      Let({
          vid: data.vid,
          token_match: q.Match(q.Index("tokenvalidate"), q.Var("vid")),
          tg: q.If(q.Exists(q.Var("token_match")), q.Get(q.Var("token_match")), null),
          acc: q.Match(q.Index("tokenvalidate"), q.Var("vid")),
          accg: q.If(q.Exists(q.Var("acc")), q.Get(q.Var("acc")), null),
      },
      q.Delete(tg),
      q.Delete(accg)
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};
