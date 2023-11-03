import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-326066f7-crud-001.a.aivencloud.com",
  port: 28931,
  user: "avnadmin",
  password: "AVNS_Vy38Wvz5YGMf3Rj52ME",
  database: "defaultdb",
});

db.connect((err) => {
  if (err) return console.log(err);
  return console.log("Database Connected");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM Student";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Database Connection Error" });
    return res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO Student (`Name`, `Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM Student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Database Connection Error" });
    return res.json(result);
  });
});

app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM Student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Database Connection Error" });
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE Student SET `Name`=?, `Email`=? WHERE ID=? ";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM Student WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.listen(1992, () => {
  console.log("Listening on Port 1992");
});
