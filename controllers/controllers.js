const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize");
const config = require("../config/config.json");
const bycrypt = require("bcrypt");
const { formatDateToWIB } = require("../utils/time");
const { Project, User } = require("../models");
const Swal = require("sweetalert2");
const {
  testimonials,
  filterTestimonialByStar,
} = require("../utils/testimonials");
const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  const { user } = req.session;

  res.render("index", { user });
}
// Blog Render

async function renderProject(req, res) {
  const { user } = req.session;
  const projects = await Project.findAll({
    include: { model: User, as: "user" },
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
  const title = await Project.create({
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
  const project = await Project.findByPk(id);
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
  res.render("testimonials");
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
  let { inputTitle, inputContent, image } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;

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

  const query = `UPDATE public."Projects"
                  SET title ='${inputTitle}', content ='${inputContent}', image ='${image}', teknologi ='${checkBox}'
                 WHERE id = ${id}`;

  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

  // console.log(result);

  res.redirect("/project");
}
async function deletProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
                  WHERE id = ${id}`;
  try {
    const result = await sequelize.query(query, { type: QueryTypes.DELETE });
    if (result.ok) {
      // console.log("hasil:", result.ok);
      Event.preventDefault();
      window.alert("hai");
    }
    Swal.fire("SweetAlert2 is working!:", result);
    console.log(result.ok);
    res.redirect("/project");
  } catch (err) {
    console.error(err.message);
  }
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
  try {
    const user = await User.create({ username, email, password: hashpass });
    console.log("ini adalah username", username, email, password);
  } catch (err) {
    console.error(err.message);
  }
  res.redirect("/login");
}
async function authLogin(req, res) {
  const { email, password } = req.body;
  console.log(password);
  let getUser = await User.findOne({ where: { email } });
  console.log(getUser);
  if (getUser === null || !getUser) {
    console.log("User tidak ketemu");
    return res.render("404");
  }
  console.log("this is", getUser.password);
  const isValidated = await bycrypt.compare(password, getUser.password);
  console.log(isValidated);

  if (!isValidated) {
    return res.render("404", { message: "Password Salah" });
  }
  let loggedUser = getUser.toJSON();
  delete loggedUser.password;
  req.session.user = loggedUser;
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
