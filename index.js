const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const uploads = require("./middleware/fileupload");
const flash = require("express-flash");
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
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
} = require("./controllers/controllers");

const app = express();
const port = 5000;

app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
const {
  formatDateToWIB,
  getRelativeTime,
  getDuration,
} = require("./utils/time");
const { truncateText } = require("./utils/truncate");
const { techValue } = require("./utils/techvalue");
const { filterTestimonialByStar } = require("./utils/testimonials");

// handlebars declaration
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("equal", function (a, b) {
  return a == b;
});

hbs.registerHelper("getStack", techValue);
hbs.registerHelper("getDuration", getDuration);
hbs.registerHelper("truncate", truncateText);

// static path/ static file
app.set("views", path.join(__dirname, "./views"));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/utils", express.static(path.join(__dirname, "./utils")));

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
app.post("/addProject", uploads.single("image"), addProject);
app.get("/project-detail/:id", renderProjectDetail);
app.get("/edit-project/:id", renderEditProject);
app.patch("/update-project/:id", updateProject);
app.delete("/delet-project/:id", deletProject);
app.get("/login", renderLogin);
app.post("/login", authLogin);
app.get("/register", renderRegister);
app.post("/register", authRegister);
app.get("/logout", authLogout);
app.get("*", renderHandle);

app.listen(port, () => {
  console.log(`app running sucessfully on port: ${port}`);
});
module.exports = app;
