var jwt = require('jsonwebtoken');
const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
bodyParser.json(app);

let user_account = [];

// sign up end point
app.post("/api/v1/signup", (req, res) => {
    const schema = Joi.object().keys({
      Email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
      Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      First_name: Joi.string().alphanum().min(3).max(30).required(),
      Last_name: Joi.string().alphanum().min(3).max(30).required()
    });
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
    }
    const create_signup = {
      Email: req.body.Email,
      Password: req.body.Password,
      First_name: req.body.First_name,
      Last_name: req.body.Last_name
    };
    
  
  user_account.push(create_signup);
  
      jwt.sign({create_signup}, "secretkey" ,(error,token)=>{
          res.json({
              status: "success",
              data:{
                  token,
                  First_name:req.body.First_name,
                  Last_name: req.body.Last_name,
                  Email: req.body.Email
              }
          });
      }); 
  
  });

// listening port

app.listen(7000, () => console.log("Listening on port 7000"));
