const router = require("express").Router();
const Account = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
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

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    const { name } = req.body;
    const newAccount = {
      name: name.trim(),
      budget: req.body.budget,
    };
    Account.create(newAccount)
      .then((account) => {
        console.log(account);
        res.status(201).json(account);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    const { name } = req.body;
    const newAccount = {
      name: name.trim(),
      budget: req.body.budget,
    };
    Account.updateById(req.params.id, newAccount)
      .then((account) => res.status(200).json(account))
      .catch(next);
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    custom: `Something is wrong`,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
