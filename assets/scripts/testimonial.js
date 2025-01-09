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

const testimonialsContainer = document.getElementById("testimonialsContainer");

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
          <div id="testimonialsCard" class="card-animate col card-testimonials pb-2 px-3 mx-0 my-3 ">
            <div class="header-testimonials ">
              <div class="image-testimonials">
                <img src="${testimonial.image}" alt="">
              </div>
              <div>
                <div class="stars-testimonials">
                ${mapStar(testimonial.star)}
                </div>
                <p class="name-testimonials"> ${
                  testimonial.author
                } | <span class="time-testimonials">2 days ago</span> </p>
              </div>
            </div>
            <p class="message-testimonials">
              ${testimonial.content}
            </p>
          </div>
        </div>

         `
    )
    .join("");
};
function mapStar(star) {
  let str = "";
  let Diffstar = 5 - star;
  if (star < 5) {
    for (let i = 0; i < star; i++) {
      str += '<i class="fa-solid fa-star" style="color: #2392e7"></i>';
    }
    for (let i = 0; i < Diffstar; i++) {
      str += '<i class="fa-solid fa-star" style="color:rgb(11, 14, 15)"></i>';
    }
  } else {
    for (let i = 0; i < star; i++) {
      str += '<i class="fa-solid fa-star" style="color: #2392e7"></i>';
    }
  }
  return str;
}

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  console.log("rating", rating);
  console.log(testimonials);
  const filter = testimonials.filter(
    (__testimonial) => __testimonial.star === rating
  );

  console.log(filter);

  if (filter.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filter);
  }, 500);
}
