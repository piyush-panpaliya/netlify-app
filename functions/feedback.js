const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);

  try {
    let avenger = await clientQuery.query(
    q.Let( {                                 
    vid:data.vid,
    feedback: q.ToNumber(data.fb),
    account_match: q.Match(q.Index("unique_id"), q.Var("vid")), 
    id_is_new: q.Not(q.Exists(q.Var("account_match"))) }, 

    q.If(q.Not(q.Var("id_is_new")),  
        q.Do( 
          q.Update(q.Select(["ref"],q.Get(q.Match(q.Index("unique_vid"), q.Var("vid")))),            
            {
              data: {
                fb: q.Var("feedback"),
              }
            }
          ),
          "updated"
        )
      ,null
    )
  )
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};