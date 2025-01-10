const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize");
const config = require("../config/config.json");
const bycrypt = require("bcrypt");
const { formatDateToWIB } = require("../utils/time");
const { Project, User } = require("../models");
const Swal = require("sweetalert2");
const fs = require("fs");
const {
  testimonials,
  filterTestimonialByStar,
} = require("../utils/testimonials");
const flash = require("express-flash");
const env = process.env.NODE_ENV || "production";
const sequelize = new Sequelize(config["production"]);

function renderHome(req, res) {
  const { user } = req.session;

  res.render("index", { user });
}
// Blog Render

async function renderProject(req, res) {
  const { user } = req.session;
  const projects = await Project.findAll({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    order: [["createdAt", "DESC"]],
  });

  res.render("project", { projects: projects, user });
}
function renderaddProject(req, res) {
  if (!req.session.user) {
    return res.redirect("404");
  }
  res.render("addproject");
}
async function addProject(req, res) {
  const { user } = req.session;
  console.log(req.file);
  const imageHandle =
    "http://localhost:5000/assets/uploads/" + req.file.filename;
  const {
    inputTitle,
    inputContent,
    dateStart,
    dateEnd,
    angular,
    nodeJs,
    react,
    vueJs,
  } = req.body;

  let checkBox = "";
  if (angular) {
    checkBox += angular.concat(",");
  }
  if (nodeJs) {
    checkBox += nodeJs.concat(",");
  }
  if (react) {
    checkBox += react.concat(",");
  }
  if (vueJs) {
    checkBox += vueJs.concat(",");
  }
  const user_id = user.id;
  const createProject = await Project.create({
    title: `${inputTitle}`,
    content: `${inputContent}`,
    image: `${imageHandle}`,
    teknologi: `${checkBox}`,
    dateStart: `${dateStart}`,
    dateEnd: `${dateEnd}`,
    user_id: user_id,
  });
  res.redirect("/project");
}
async function renderProjectDetail(req, res) {
  const { id } = req.params;
  const { user } = req.session;
  const project = await Project.findByPk(id);
  if (!user) {
    res.redirect("/login");
  }
  if (project === null) {
    res.render("404");
  } else {
    console.log(project); // true
    res.render("project-detail", { data: project });
  }
  // const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  // console.log(project);
}
function renderTestimonial(req, res) {
  const { user } = req.session;
  res.render("testimonials", { user: user });
}
function renderContact(req, res) {
  const { user } = req.session;
  res.render("contact", { user });
}
async function renderEditProject(req, res) {
  const { id } = req.params;
  const { user } = req.session;
  const query = `SELECT * FROM public."Projects" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  const tech = project[0].teknologi;
  // console.log(tech);
  console.log(project[0]);
  const angular = tech.includes("Angular"); // true
  const node = tech.includes("NodeJs");
  const react = tech.includes("React"); //false
  const vue = tech.includes("VueJs");
  console.log(project[0].dateStart.toString());

  res.render("edit-project", {
    data: project[0],
    angular,
    node,
    react,
    vue,
  });
}

async function updateProject(req, res) {
  const { id } = req.params;
  const img = req.query.image;
  let { inputTitle, inputContent, image, dateStart, dateEnd } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;
  const { loggedUser } = req.session;

  if (image == "") {
    image = img;
  }

  let checkBox = [];
  if (angular) {
    checkBox.push(angular);
  }
  if (nodeJs) {
    checkBox.push(nodeJs);
  }
  if (react) {
    checkBox.push(react);
  }
  if (vueJs) {
    checkBox.push(vueJs);
  }
  await Project.update(
    {
      title: `${inputTitle}`,
      dateStart: `${dateStart}`,
      dateEnd: `${dateEnd}`,
      content: `${inputContent}`,
      teknologi: `${checkBox}`,
      image: `${image}`,
      updateAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );

  // const query = `UPDATE public."Projects"
  //                 SET title ='${inputTitle}', content ='${inputContent}', image ='${image}', teknologi ='${checkBox}', 'dateStart'='${dateStart}', 'dateEnd'='${dateEnd}',
  //                WHERE id = ${id}`;

  // await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/project");
}
async function deletProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
                  WHERE id = ${id}`;

  const result = await sequelize.query(query, { type: QueryTypes.DELETE });
  res.redirect("/project");
}
function renderLogin(req, res) {
  res.render("auth-login");
}
function renderRegister(req, res) {
  res.render("auth-register");
}

function renderHandle(req, res) {
  res.render("404");
}
async function authRegister(req, res) {
  const { username, email, password } = req.body;

  const saltRound = 10;
  const hashpass = await bycrypt.hash(password, saltRound);
  if (!username || !email || !password) {
    req.flash("error", "input cannot be empty");
    return res.redirect("/register");
  }

  let getUser = await User.findOne({ where: { email: email } });

  if (getUser) {
    req.flash("error", "email sudah terdaftar");
    return res.redirect("/register");
  }

  await User.create({ username, email, password: hashpass });

  req.flash("success", "register succes");
  res.redirect("/login");
}
async function authLogin(req, res) {
  const { email, password } = req.body;
  console.log(password);

  let getUser = await User.findOne({ where: { email } });
  console.log(getUser);

  if (getUser === null || !getUser) {
    req.flash("error", "input cannot be empty");
    return res.redirect("/login");
  }

  console.log("this is", getUser.password);
  const isValidated = await bycrypt.compare(password, getUser.password);
  console.log(isValidated);

  if (!isValidated) {
    req.flash("error", "wrong password");
    return res.redirect("/login");
  }
  let loggedUser = getUser.toJSON();
  delete loggedUser.password;
  req.session.user = loggedUser;
  req.flash("success", "login success");
  res.redirect("/");
}

function authLogout(req, res) {
  req.session.user = null;
  res.redirect("/login");
}
module.exports = {
  renderHome,
  renderProject,
  renderTestimonial,
  renderContact,
  renderHandle,
  renderaddProject,
  addProject,
  renderProjectDetail,
  renderEditProject,
  updateProject,
  deletProject,
  renderLogin,
  authLogin,
  renderRegister,
  authRegister,
  authLogout,
};
