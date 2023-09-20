const moment = require("moment");
const users = require("../models/userModel");
const { format } = require("@fast-csv/format");
const fs = require("fs");

exports.userpost = async (req, res) => {
  const file = req.file?.filename;
  const { fname, lname, mobile, status, location, gender, email } = req.body;

  if (
    !fname ||
    !lname ||
    !mobile ||
    !status ||
    !location ||
    !gender ||
    !email ||
    !file
  ) {
    res.status(401).json("All inputs are required");
  }

  try {
    const existsUser = await users.findOne({ email });

    if (existsUser) {
      res.status(401).json("This user already exists");
    }

    const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const userdata = new users({
      fname,
      lname,
      mobile,
      status,
      location,
      gender,
      email,
      profile: file,
      createdAt: date,
    });
    await userdata.save();

    res
      .status(200)
      .json({ message: "Registration successfully", success: true, userdata });
  } catch (error) {
    res.status(401).json(error);
    console.log("Catch block error");
  }
};

exports.userget = async (req, res) => {
  const search = req?.query?.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 4;

  console.log(req.query);

  const query = {
    fname: { $regex: search, $options: "i" },
  };

  if (gender !== "All") {
    query.gender = gender;
  }
  if (status !== "All") {
    query.status = status;
  }
  try {
    const skip = (page - 1) * ITEM_PER_PAGE; // 1 * 4 = 4

    const count = await users.countDocuments(query);
    const userdata = await users
      .find(query)
      .sort({ createdAt: sort == "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);
    res.status(200).send({
      Pagination: {
        count,
        pageCount,
      },
      userdata,
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

// single user get
exports.singleuserget = async (req, res) => {
  const { id } = req.params;

  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

//Edit user
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile;

  const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateuser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        updatedAt: date,
      },
      {
        new: true,
      }
    );

    await updateuser.save();
    res
      .status(200)
      .json({ message: "Updated successfully", success: true, updateuser });
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.userdelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletuser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deletuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// chnage status
exports.userstatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const userstatusupdate = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(userstatusupdate);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.userExport = async (req, res) => {
  try {
    const userdata = await users.find();

    const csvStream = format({ headers: true });

    if (!fs.existsSync("public/files/export/")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files/");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export/");
      }
    }

    const writablestream = fs.createWriteStream(
      "public/files/export/users.csv"
    );

    csvStream.pipe(writablestream);

    writablestream.on("finish", function () {
      res.json({
        downloadUrl: "http://localhost:5000/files/export/users.csv",
      });
    });

    if (userdata.length > 0) {
      userdata.map((user) => {
        csvStream.write({
          FirstName: user.fname ? user.fname : "-",
          LastName: user.lname ? user.lname : "-",
          Email: user.email ? user.email : "-",
          Phone: user.mobile ? user.mobile : "-",
          Gender: user.gender ? user.gender : "-",
          Status: user.status ? user.status : "-",
          Profile: user.profile ? user.profile : "-",
          Location: user.location ? user.location : "-",
          DateCreated: user.createdAt ? user.createdAt : "-",
          DateUpdated: user.updatedAt ? user.updatedAt : "-",
        });
      });
    }
    csvStream.end();
    writablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
