function alertError(mesg) {
  console.log("hello");
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${mesg}`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}

function alertQuestion(msg) {
  Swal.fire({
    title: "The Internet?",
    text: `${msg}`,
    icon: "question",
  });
}
function alertSuccess(msg) {
  Swal.fire({
    title: `${msg}`,
    icon: "success",
    draggable: true,
  });
}
function alertDelete(msg) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
