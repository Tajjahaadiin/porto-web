var contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitForm(e);
});

function submitForm(e) {
  var form = e.target;
  var formData = new FormData(form);

  var data = Object.fromEntries(formData.entries());

  console.log(data);

  console.log(data.phoneNumber);

  var link = document.createElement("a");

  link.href = `mailto:tajj@gmail.com?subject=${data.subject}&body=Selamat siang. Nama saya ${data.name}.%0D%0ASilahkan hubungi saya di ${data.email} atau ${data.phoneNumber}. Skill saya adalah Fullstack Developer. Berikut pesan saya : ${data.message}`;

  link.click();
  setTimeout(() => {
    window.location = "/";
  }, 1500);
}
// function downloadCv() {
//   var link = document.createElement("a");
//   link.href = "./download.pdf";
//   link.download = "./download.pdf";
//   link.dispatchEvent(new MouseEvent("click"));
// }
