// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});
// Import contact controller

var userController = require("./userController");
// Contact routesx
var contractController=require("./contractController");

router
  .route("/users")
  .get(userController.index)
  .post(userController.new);
router.route("/login").post(userController.view);
router.route("/verify").post(userController.verify);
router.route("/forgotPassword").post(userController.forgotPassword);
router.route("/resetPassword").post(userController.resetPassword);

router.route("/dashboard").get(contractController.dashboard);
router.route("/dashboard/getbalance").post(contractController.getbalance);
router.route("/dashboard/roundInfo").post(contractController.roundInfo);
router.route("/dashboard/showRecords").post(contractController.showRecord);
router.route("/dashboard/getTransaction").post(contractController.getTransaction);
router.route("/dashboard/getTokenTransfer").post(contractController.getTokenTransfer);


router.route("/dashboard/getCurrentRound").get(contractController.getCurrentRound);
router.route("/dashboard/softCap").get(contractController.softCap);
router.route("/dashboard/hardCap").get(contractController.hardCap);
router.route("/dashboard/rate").get(contractController.rate);
router.route("/dashboard/startTime").get(contractController.startTime);
router.route("/dashboard/endTime").get(contractController.endTime);
router.route("/dashboard/maxTokens").get(contractController.maxTokens);

module.exports = app => {
  app.get("/user/data", checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, "privatekey", (err, blogs) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        //If token is successfully verified, we can send the autorized data
        res.json({
          message: "Successful log in",
          blogs
        });
        console.log("SUCCESS: Connected to protected route");
      }
    });
  });
};2

// Export API routes
module.exports = router;
