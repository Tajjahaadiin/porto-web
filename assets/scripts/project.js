let projects = [];

function addProject(e) {
  e.preventDefault();
  let projectName = document.getElementById("projectName").value;
  let descProject = document.getElementById("descProject").value;
  let image = document.getElementById("input-project-image");
  let dateStart = document.getElementById("startDate").value;
  let dateEnd = document.getElementById("endDate").value;

  if (projectName == "" || descProject == "" || image == "") {
    return alert("input field cannot be empty");
  }
  image = URL.createObjectURL(image.files[0]);
  let project = {
    author: "Tajjuddiin",
    name: projectName,
    description: descProject,
    image: image,
    startDate: dateStart,
    endDate: dateEnd,
  };
  projects.push(project);
  renderProject();
}

function renderProject() {
  console.log(projects);
  projectList = document.getElementById("project-list");
  let date1 = new Date(projects[0].endDate);
  let date2 = new Date(projects[0].startDa);
  let diff = Math.abs(date1 - date2);
  console.log(diff, date1, date2);

  for (let index = 0; index < projects.length; index++) {
    projectList.innerHTML += `
       <div class="project-card">
          <img
            src="${projects[index].image}"
            alt=""
          />
          <div class="project-cap">
            <p>${projects[index].name}</p>
            <p>durasi 3 bulan</p>
          </div>
          <div class="project-desc">
            <p>
              ${projects[index].description}
            </p>
          </div>
          <div class="project-icon">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
          <div class="project-config">
            <button>edit</button>
            <button>delete</button>
          </div>
        </div>
      `;
  }
}

function formatDateToWIB(date) {
  let months = [
    "Jan", // 0
    "Feb", // 1
    "Mar", // 2
    "Apr", // 3
    "Mei", // 4
    "Jun", // 5
    "Jul", // 6
    "Aug", // 7
    "Sep", // 8
    "Okt", // 9
    "Nov", // 10
    "Des", // 11
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()]; // ===>>> bukan nama bulan, bukan angka bulan, tapi index dari bulan tersebut
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0"); // ===> "2"

  let minutes = date.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000); // satuan dari ms ke detik

  console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
}
