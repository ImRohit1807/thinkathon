const models = [
    "Auth",
    "User",
  ];
  
models.forEach((model) => {
  console.log('model: ' + model)
    let routers = require("./src/api/" + model + "/Routes/routes.js");
    app.use("/api/" + model, routers);
  });