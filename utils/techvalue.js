function techValue(techValue) {
  const string = techValue.split(",");
  var holder = "";
  const template = string.forEach((element) => {
    var techString = element.toLowerCase();
    holder += `<i class="fa-brands fa-${techString} fs-2"></i>`;
  });
  return holder;
}
module.exports = { techValue };
