const router = require('express').Router();
const pool = require('../modules/pool');

router.get("/", (req, res) => {
    console.log("GET /todos!");
  
    const sqlText = `
          SELECT * FROM todos
          ORDER BY id;
      `;
    pool
      .query(sqlText)
      .then((dbRes) => {
        let todosAsked = dbRes.rows;
        res.send(todosAsked);
      })
      .catch((dbErr) => {
        console.log("ERROR", dbErr);
        res.sendStatus(500);
      });
  });
  

  router.post("/", (req, res) => {
    const text = req.body.text;
    const sqlText = `
          INSERT INTO "todos"
              (text)
              VALUES 
              ($1);
      `;
    const sqlValues = [text];
  
    pool
      .query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        res.sendStatus(500);
      });
  });
  
  
router.put("/:id", (req, res) => {
    let todoId = req.params.id;
    let sqlText = `
          UPDATE todos SET "isComplete" = TRUE
              WHERE id = $1
          `;
    pool
      .query(sqlText, [todoId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("ERROR", err);
        res.sendStatus(500);
      });
  });


router.delete("/:todo_id", (req, res) => {
    const todoIdToDelete = req.params.todo_id;
    const sqlText = `
          DELETE FROM todos
              WHERE id = $1;
      `;
    const sqlValues = [todoIdToDelete];
  
    pool
      .query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        res.sendStatus(500);
      });
  });
  
  
  module.exports = router;
