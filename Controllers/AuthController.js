import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new User
export const registerUser = async (req, res) => {
  // const { username, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  // const hashedPass = await bcrypt.hash(password, salt);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const newUser = new UserModel(req.body);

  // const newUser = new UserModel({
  //   username,
  //   password: hashedPass,
  //   firstname,
  //   lastname,
  // });
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registred!" });
    }
    // await newUser.save();
    const user = await newUser.save();

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
        // 1minute="60000"
        // expiresIn: "60000",
      }
    );
    // res.status(200).json(newUser);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
            // 1minute="60000"
            // expiresIn: "60000",
          }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ username: username });

//     if (user) {
//       const validity = await bcrypt.compare(password, user.password);
//       validity
//         ? res.status(200).json(user)
//         : res.status(400).json("Wrong Password");
//     } else {
//       res.status(404).json("User does not exists");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
