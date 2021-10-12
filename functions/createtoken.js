const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);

  try {
    let avenger = await clientQuery.query(
      q.Let( {                                 
		token: data.token, 
		vid:data.vid,
		tvn:data.tvn,
		account_match: q.Match(q.Index("unique_id"), q.Var("vid")), 
		id_is_new: q.Not(q.Exists(q.Var("account_match"))) }, 

	q.If(q.Var("id_is_new"),
	    q.Do(
	      q.Create(
	        // Store signup token for new account
	        q.Collection("tokens"),
	        {
	          data: {
	            token: q.Var("token"),
	            tun: 0,
	            tvn: q.Subtract(q.Var("tvn"),1),
	            vid: q.Var("vid"),
	            ta:true,
	          }
	        }
	      ),
	      "added t"
	    ),
	    q.Do( 
	      q.Update(q.Select(["ref"],q.Get(q.Match(q.Index("unique_id"), q.Var("vid")))),            
	        {
	          data: {
	            token: q.Var("token"),
	            tun: 0,
	            tvn: q.Var("tvn"),
	            ta:true,
	          }
	        }
	      ),
	      "updated t"
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





