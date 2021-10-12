const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);

  try {
          let avenger = await clientQuery.query(
           q.Let(                                
        {
          token: data.token,
          token_match: q.Match(q.Index("tokenvalidate"), q.Var("token")),
          tg: q.If(q.Exists(q.Var("token_match")), q.Get(q.Var("token_match")), null),
        },
        q.If(
          q.IsNull(q.Var("tg")), // Token not found?
          "invalid",
          q.If(
           q.Select(["data", "ta"], q.Var("tg")), // Expired?
           q.If(
                 q.GTE(q.Select(["data", "tvn"], q.Var("tg")),q.Select(["data", "tun"], q.Var("tg"))),
             q.Do(
                q.Update(q.Select("ref", q.Var("tg")), 
                {data:{tun: q.Add(1, q.Select(["data", "tun"], q.Var("tg"))) }}), // Set as used
                { vid: q.Select(["data", "vid"], q.Var("tg"))}
                ),
               q.Do( 
                q.Update(q.Select("ref", q.Var("tg")),{data:{ta:false}}), 
                "limit"
                )
            ),
            "not allowed" 
          )
        )
      )
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};


