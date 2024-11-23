const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db.js");
const app = express();
const port = 3001;

// handler untuk parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk menambah data user
app.post("/users", (req, res) => {
  connection.query("INSERT INTO tbl_users SET ?", req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting data");
    } else {
      res.status(201).send({
        message: "Data inserted successfully",
        result: result,
      });
    }
  });
});

// Endpoint untuk menampilkan pesan default
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Endpoint untuk mengambil semua data user
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM tbl_users", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

// soal 1
// Endpoint untuk mengambil user berdasarkan id
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM tbl_users WHERE id = ?";

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

// soal 2
// Endpoint untuk mengedit user berdasarkan id
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  const query = "UPDATE tbl_users SET ? WHERE id = ?";

  connection.query(query, [updatedData, userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating user");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("User updated successfully");
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

// soal-3
// Endpoint untuk menghapus user berdasarkan id
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM tbl_users WHERE id = ?";

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting user");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("User deleted successfully");
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

// port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
