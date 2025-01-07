const { Sequelize, QueryTypes, Model } = require("sequelize");
const config = require("../config/config.json");
const { formatDateToWIB } = require("../utils/time");
const { Project } = require("../models");
const Swal = require("sweetalert2");
const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  res.render("index");
}
// Blog Render

async function renderProject(req, res) {
  const query = `SELECT * FROM public."Projects" ORDER By "createdAt" DESC`;
  // const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  const projects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("project", { projects: projects });
}
function renderaddProject(req, res) {
  res.render("addproject");
}
async function addProject(req, res) {
  const { inputTitle, inputContent, image, dateStart, dateEnd } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;
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
  const query = `INSERT INTO public."Projects"
                (title, content, image, teknologi)
                VALUES
                ('${inputTitle}', '${inputContent}', '${image}', '${checkBox}')
  `;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log(result);

  res.redirect("/project");
}
async function renderProjectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("project-detail", { data: project[0] });
}
function renderTestimonial(req, res) {
  res.render("testimonials");
}
function renderContact(req, res) {
  res.render("contact");
}
async function renderEditProject(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Projects" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  const tech = project[0].teknologi;
  console.log(tech);
  const angular = tech.includes("Angular"); // true
  const node = tech.includes("NodeJs");
  const react = tech.includes("React"); //false
  const vue = tech.includes("VueJs");

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

  console.log(result);

  res.redirect("/project");
}
async function deletProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
                  WHERE id = ${id}`;
  try {
    const result = await sequelize.query(query, { type: QueryTypes.DELETE });
    if (result.ok) {
      console.log("hasil:", result.ok);
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

function renderHandle(req, res) {
  res.render("404");
}
function deleteHandle(response) {}
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
};
