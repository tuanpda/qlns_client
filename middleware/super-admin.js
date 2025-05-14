import Swal from "sweetalert2";
export default async function ({ $auth, redirect }) {
  let user = $auth.$state.user;
  if (
    user && user.role == 1
  ) {
    //console.log('ccc') and let user in
  } else {
    redirect("/");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "STOP HERE! NOT APPROVED!",
    });
  }
}
