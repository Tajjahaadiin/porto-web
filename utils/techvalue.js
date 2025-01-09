function techValue(techValue) {
  var holder = "";

  let string = techValue.split(",");
  const template = string.forEach((element) => {
    var techString = element.toLowerCase();

    if (techString === "nodejs") {
      techString = "node-js";
      holder += `<i class="fa-brands fa-${techString} "></i>`;
    } else {
      holder += `<i class="fa-brands fa-${techString} "></i>`;
    }
  });
  return holder;
}

module.exports = { techValue };
