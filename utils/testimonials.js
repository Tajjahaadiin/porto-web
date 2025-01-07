const hbs = require("hbs");
const fs = require("fs");
const source = fs.readFileSync("./views/testimonials.hbs", "utf8");
let testimonials = [
  {
    author: "Tajj1",
    star: 1,
    content: "luxurious web",
    image: "https://ui-avatars.com/api/?name=Tajj+Ahaadiin",
  },
  {
    author: "Tajj2",
    star: 2,
    content:
      "Desain website yang dibuat oleh tim Anda sangat modern dan menarik! Pelanggan saya seringkali memberikan pujian atas tampilan website yang baru. Terima kasih atas kerja samanya",
    image: "https://picsum.photos/200",
  },
  {
    author: "Tajj3",
    star: 3,
    content:
      "Sejak website kami didesain ulang, penjualan kami meningkat secara signifikan. Fitur-fitur yang Anda tambahkan sangat membantu dalam menarik pelanggan baru.",
    image:
      "https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Lasse+Rafn/128",
  },
  {
    author: "Tajj4",
    star: 4,
    content:
      "Saya sangat terkesan dengan respon cepat tim Anda saat saya mengalami kendala dengan website. Masalah teratasi dengan cepat dan profesional.",
    image: "https://ui-avatars.com/api/?background=random",
  },
  {
    author: "tajj5",
    star: 5,
    content:
      "Proses kerja sama dengan tim Anda sangat lancar. Kalian selalu terbuka terhadap masukan dan ide-ide saya. Terima kasih atas dedikasinya",
    image: "https://ui-avatars.com/api/?background=random",
  },
];

function filterTestimonialByStar(rating) {
  console.log(rating);
}

// console.log(testimonialsTemplate("a")); // <span>Greetings from the club!</span>

module.exports = { testimonials, filterTestimonialByStar };
