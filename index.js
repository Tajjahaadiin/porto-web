const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {
  renderHome,
  renderProject,
  renderTestimonial,
  renderContact,
  renderHandle,
  renderaddProject,
  renderProjectDetail,
  renderEditProject,
  updateProject,
  deletProject,
  addProject,
} = require("./controllers/controllers");

const app = express();
const port = 5000;
const { formatDateToWIB, getRelativeTime } = require("./utils/time");

// handlebars declaration
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("equal", function (a, b) {
  return a == b;
});

// static path/ static file
app.set("views", path.join(__dirname, "./views"));
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Rendering
app.get("/", renderHome);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("/addproject", renderaddProject);
app.post("/addProject", addProject);
app.get("/project-detail/:id", renderProjectDetail);
app.get("/edit-project/:id", renderEditProject);
app.patch("/update-project/:id", updateProject);
app.delete("/delet-project/:id", deletProject);
app.get("*", renderHandle);

app.listen(port, () => {
  console.log(`app running sucessfully on port: ${port}`);
});
