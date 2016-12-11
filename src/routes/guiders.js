import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.status(404)
    .send();
});

router.get("/:id", (req, res) => {
  res.status(404)
    .send();
});

router.post("/", (req, res) => {
  res.status(404)
    .send();
});

router.put("/:id", (req, res) => {
  res.status(404)
    .send();
});

router.delete("/:id", (req, res) => {
  res.status(404)
    .send();
});


module.exports = router;
