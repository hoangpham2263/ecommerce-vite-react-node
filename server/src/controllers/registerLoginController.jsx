// import registerLoginService from "../services/registerLoginService";

// Register
const registerAccount = async (req, res) => {
  console.log(">>>>>>>>>>", req.body)
  try {
    const { fullName, username, email, password, confirmPassword, gender } = req.body.data;
    if (!lastName || !firstName || !email || !password || !phone || !sex) {
      return res.status(200).json({ message: "missing required parameters", data: [] });
    }
    if (password && password.length < 6) {
      return res.status(200).json({ EM: "Your password must have more than 6 letters", EC: "1", DT: "", });
    }
    // let data = await registerLoginService.registerNewUser(req.body.data);

    // return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT, });
  } catch (error) {
    return res.status(500).json({ EM: "Error from server", EC: -1, DT: "", });
  }
};

// Login
// const loginUser = async (req, res) => {
//   try {
//     if (!req.body.data.valueLogin || !req.body.data.password) {
//       return res.status(200).json({ EM: "Missing required parameters", EC: 1, DT: "", });
//     }
//     if (req.body.data.password && req.body.data.password.length < 6) {
//       return res.status(200).json({ EM: "Your password must have more than 6 letters", EC: 1, DT: "", });
//     }

//     let data = await registerLoginService.handleLoginUser(req.body.data);

//     await res.cookie("jwt", data.DT.access_token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       secure: "production" === 'production',
//       SameSite: "None"
//     });

//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT, });
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

// Read JWT
// const readJWT = async (req, res) => {
//   try {
//     const cookie = req.cookies;
//     if (cookie.jwt) {
//       return res.status(200).json({ EM: "Read JWT success", EC: "0", DT: cookie, });
//     } else {
//       return res.status(200).json({ EM: "JWT not exists success", EC: "1", DT: [], });
//     }
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

// Logout
// const logoutUser = async (req, res) => {
//   try {
//     const cookie = req.cookies;
//     if (cookie?.jwt) {
//       res.clearCookie("jwt", { secure: true, });

//       return res.status(200).json({ EM: "Logout user success", EC: 0, DT: [], });
//     } else {
//       return res.status(200).json({ EM: "Logout user error", EC: 1, DT: [], });
//     }
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

module.exports = { registerAccount };
