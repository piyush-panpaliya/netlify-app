const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

const rateLimit = require("lambda-rate-limiter")({
  interval: 60 * 1000 // Our rate-limit interval, one minute
}).check;

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  try{
  	try {
    let avenger = await clientQuery.query(
      q.Let( {                                 
		vid:data.vid,
		tvn: q.ToNumber(data.tvn),
		account_match: q.Match(q.Index("unique_id"), q.Var("vid")), 
		id_is_new: q.Not(q.Exists(q.Var("account_match"))) }, 

	q.If(q.Var("id_is_new"),
	    q.Do(
	      q.Create(
	        // Store signup token for new account
	        q.Collection("tokens"),
	        {
	          data: {
	            token: q.NewId(),
	            tun: 0,
	            tvn: q.Subtract(q.Var("tvn"),1),
	            vid: q.Var("vid"),
	            ta:true,
	          }
	        }
	      ),
	      q.Get(q.Match(q.Index("gettoken"), q.Var("vid")))
	    ),
	    q.Do( 
	      q.Update(q.Select(["ref"],q.Get(q.Match(q.Index("unique_id"), q.Var("vid")))),            
	        {
	          data: {
	            token: q.NewId(),
	            tun: 0,
	            tvn: q.Var("tvn"),
	            ta:true,
	          }
	        }
	      ),
	      q.Get(q.Match(q.Index("gettoken"), q.Var("vid")))
	    )
    )
)
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
}
  catch (error) {
    return { statusCode: 429 }; // Still returning a basic 429, but we could do anything~
  }
  
  
 
};;





