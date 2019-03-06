
const exhbs = require("express-handlebars");
const express = require("express");
var ex = express();
const Form = require("../Schema/Form2");
const bodyparser = require("body-parser");
var path = require("path")
var router = express.Router();
router.use(bodyparser.json());
router.route("/")


.get(async (req,res,next)=>
{
var id=req.query.id;

    Form.user1.aggregate([

{$match :{lead_id:id}},{$match :{branch_name:"sbi1"}},


{
    $lookup:{

                    from: "users" ,
                    localField:"agent_id",
                    foreignField:"lead_id",
                    as:  "Manager"  ,
    }
},
{
			"$project" : {
				"agent_id" : "$agent_id",
                "agent_name":"$agent_name",
                "agent_rol": "$agent_rol",
                "agent_email": "$agent_email",
                "staff":    "",	
            	}
		},  
    
    
    ])
    .then((data)=>{
console.log(data)
ab = data;
         res.render('main',{ab:ab});

 })
});

module.exports=router;
