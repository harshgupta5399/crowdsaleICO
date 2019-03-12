const User = require("./userModel");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let randomString = require("randomstring");
let saltRounds = 10;
let cryptpassword;
const mailer = require("./mailer");
const accountSid = "ACfabf09b24d214381224efcb7b2e408eb";
const authToken = "1e833415e3f7bbcc7a2038202a331a70";
const client = require("twilio")(accountSid, authToken);

exports.index = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users
      });
    }
  });
};

exports.new = async function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user)
      return res.status(400).send({
        msg:
          "The email address you have entered is already associated with another account."
      });

    //send Email
    const sT = randomString.generate();

    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
      var user = new User();
      user.email = req.body.email ? req.body.email : user.email;
      user.password = hash;
      user.isAdmin = req.body.isAdmin;
      user.isVerified = false;
      user.sT = sT;
      // save the User and check for errors
      user.save(function(err) {
        if (err) res.json(err);
        else {
          res.json({
            message: "New User created!,check your email to verify",
            data: user
          });
        }
      });
      const html = `Hi there,<br/>
                    thank you for register<br><br>
                    please verify token<br><br>
                    <b>${sT}</b>`;

      await mailer.sendEmail(
        "postmaster@sandbox6b554997200b40a0b780944b38624795.mailgun.org",
        "harsh.gupta@solulab.co",
        "verify your email",
        html
      );
      client.messages
        .create({
          body: "Welcome Nigaa!!!",
          from: "+19738418994",
          to: "+918866775956"
        })
        .then(message => console.log(message.sid));
    });
  });
};

exports.view = function(req, res) {
  User.findOne({ email: req.body.email }).then(function(user) {
    if (!user) {
      res.send("not valid user");
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result == true) {
          if (!user.isVerified) res.send("plz Confirm email to login!!");

          jwt.sign(
            { user },
            "privatekey",
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
              }
              res.send(token);
            }
          );
        } else {
          res.send("incorrect password");
        }
      });
    }
  });
};

exports.verify = function(req, res) {
  User.findOne({ sT: req.body.sT }).then(function(user) {
    if (!user) {
      res.send("not valid user");
    }
    user.isVerified = true;
    user.sT = "";
    user.save(function(err) {
      if (err) console.log(err);
      else {
        res.send("now you can login");
      }
    });

    req.flash("now You can login");
  });
};

exports.forgotPassword = async function(req, res) {
  User.findOne({ email: req.body.email }, async function(err, user) {
    if (user) {
      const sT = randomString.generate();
      user.forgotToken=sT;
      await user.save();

      const html = `Hi there,<br/>
      you have requesting for forgot password<br><br>
      use below token id to reset your password<br><br>
      <b>${sT}</b>`;

      await mailer.sendEmail(
      "postmaster@sandbox6b554997200b40a0b780944b38624795.mailgun.org",
      "harsh.gupta@solulab.co",
      "reset password token",
      html
      );

      return res.status(400).send({
        msg: "you have entered correct email,reset password token has been sent to your email id,please use token to reset password!!"
      });
    } else res.send("enter correct email");
  });
};

exports.resetPassword=async function(req,res){
  user=await User.findOne({forgotToken:req.body.forgotToken});
    if(!user)res.send("enter valid token id!!")
    else{
      if(req.body.newPassword===req.body.confirmPassword){
        user.password='';
        user.forgotToken='';
        user.password=await bcrypt.hash(req.body.newPassword,saltRounds);
        await user.save();
        res.send("password reset!!");
      }else res.send("Password should be same!!!")
    }
  
};
