const { getById } = require("./accounts-model");
const yup = require("yup");

const accountSchema = yup.object({
  name: yup
    .string("name of account must be a string")
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100")
    .trim()
    .required("name and budget are required"),
  budget: yup
    .number("budget of account must be a number")
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
    .required("name and budget are required"),
});

exports.checkAccountPayload = (req, res, next) => {
  accountSchema
    .validate(req.body)
    .then((accountPayload) => {
      next();
    })
    .catch((err) => {
      next({ ...err, status: 400 }); // <----- BOOKMARK
    });
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = (req, res, next) => {
  getById(req.params.id)
    .then((account) => {
      account
        ? ((req.account = account), next())
        : next({
            message: "account not found",
            status: 404,
          });
    })
    .catch(next);
};
