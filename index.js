const express = require("express");
const connectDB = require("./DB/connectDB");
const users = require("./models/User");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

/* GET :  RETURN ALL USERS */
app.get("/api/user", async (req, res) => {
  try {
    const data = await users.find({}).exec();
    res.json({ users: data });
  } catch (error) {
    res.send("get users failed");
  }
});

/*  POST :  ADD A NEW USER TO THE DATABASE */
app.post("/api/user", (req, res) => {
  const { name } = req.body;
  users.create({ name }, (err) => {
    err ? res.send("added user failed") : res.send("added user succeed");
  });
});

/*  PUT : EDIT A USER BY ID */
app.put("/api/user/:id", (req, res) => {
  users.findByIdAndUpdate(req.params.id, req.body, (err) => {
    err
      ? res.json({ msg: "update user failed" })
      : res.json({ msg: "update user succeed" });
  });
});

/*   DELETE : REMOVE A USER BY ID */
app.delete("/api/user/:id", (req, res) => {
  users.findByIdAndRemove(req.params.id, (err) => {
    err
      ? res.json({ msg: "delete user failed" })
      : res.json({ msg: "delete user succeed" });
  });
});

app.listen(port, (err) => {
  err
    ? console.log("server run failed")
    : console.log(`server is runnig on port ${port}`);
});
