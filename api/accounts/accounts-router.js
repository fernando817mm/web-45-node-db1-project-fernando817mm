const router = require("express").Router();
const Account = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  Account.getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res) => {
  res.json(req.account);
});

router.post("/", checkAccountPayload, (req, res, next) => {
  Account.create(req.body)
    .then((account) => res.status(201).json(account))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: `Something is wrong`,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
