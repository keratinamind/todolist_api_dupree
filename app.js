// const { sequelize } = require('./models');
// sequelize.sync({ force: true });
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const listRoute = require("./routes/listRoute");
const authRoute = require("./routes/authRoute");
const errorController = require("./controllers/errorController");
const fs = require("fs");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const { List } = require("./models");
const { User } = require("./models");
const CustomError = require("./utils/error");
require("./config/passport");

const uploadPromise = util.promisify(cloudinary.uploader.upload);

const app = express();

app.use(passport.initialize());
app.get(
  "/test-passport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// middleware cors: allow access cross origin sharing
app.use(cors());
app.use(express.json());

app.use("/public", express.static(`public`));

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file , cb) => {
//       console.log(file)
//       cb(null, 'public/images');
//     },
//     filename: (req, file , cb) => {
//       cb(null, new Date().getTime()+ '.' +file.mimetype.split('/')[1]);
//     }

//   })
// });

// app.post('/upload', upload.single('thisuploadinput'), async (req,res) => {
// try {
//   console.log(req.file);
//   await List.update({ imageUrl: req.file.path}, {where:{id:1}});
//   res.json({message: 'Uploaded'})
// } catch (err) {
//   next(err)
// }
// })

//upload to cloud
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log(file);
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new CustomError('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// });

// app.post(
//   "/upload-to-cloud",
//   upload.single("cloudinput"), async (req, res, next) => {
//     console.log(req.file);
//     // cloudinary.uploader.upload(req.file.path,async(err,result) => {
//     //   if (err) console.log(err)
//     //   else console.log(result);
//     //   fs.unlinkSync(req.file.path);
//     //   await List.update({ impageUrl: result.secure_url}, {where: {id:2} })
//     //   res.json('uploadded');
//     // })
//     // try {
//     //   const result = await uploadPromise(req.file.path);
//     //   console.log(result);
//     //   await List.update({ imgUrl: result.secure_url }, { where: { id: 1 } });
//     //   fs.unlinkSync(req.file.path);
//     //   res.json("uploaded");
//     // } catch (err) {
//     //   console.log(err)
//     //   next(err);
//     // }

//     try {
//       const result = await uploadPromise(req.file.path);
//       console.log(result);
//       const user = await User.create({ username:req.body.username, password: result.secure_url , email:req.body.email});
//       fs.unlinkSync(req.file.path);
//       res.json({user});
//     }catch (err){
//       next(err)
//     }
//   })
// ;

// list route
app.use("/lists", listRoute);
// authenticate route
app.use("/", authRoute);

// path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "resource not found on this server" });
});

// error handling middleware
app.use(errorController);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
