const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Boom.badRequest(t("error:sharedErrors.allFieldsRequired"));

    const emailSplit = email.split("@");

    const filterUser =
      emailSplit.length == 1
        ? { username: emailSplit[0] }
        : { email: email.toLowerCase() };

    const userDoc = await User.findOne(filterUser);
    if (!userDoc) throw Boom.badRequest(t("error:sharedErrors.userNotFound"));
    if (!userDoc.isActive)
      throw Boom.badRequest(t("error:sharedErrors.userNotActive"));
    if (userDoc.blocked)
      throw Boom.badRequest(t("error:sharedErrors.userBlocked"));

    if (userDoc.google_auth)
      throw Boom.badRequest(t("error:sharedErrors.yesAccountOAuth"));
    const isValidPassword = (await userDoc.password) === password;

    if (!isValidPassword)
      throw Boom.badRequest(t("error:sharedErrors.passwordNotMatchLogin"));

    /* transform userDoc getter function */
    const user = userDoc.toObject();

    return res.status(200).json({
      message: t("succ:user.authenticated"),
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (!email || !password || !confirmPassword)
      throw Boom.badRequest(t("error:sharedErrors.allFieldsRequired"));
    if (password !== confirmPassword)
      throw Boom.badRequest(t("error:sharedErrors.passwordNotMatch"));

    const userDoc = await User.findOne({ email: email.toLowerCase() });
    if (userDoc)
      throw Boom.badRequest(t("error:sharedErrors.userAlreadyExists"));

    const user = await User.create({
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { authUser, registerUser };
