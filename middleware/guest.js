export default function ({ $auth, redirect }) {
  // Kiểm tra nếu người dùng đã đăng nhập
  if ($auth.loggedIn) {
    // console.log($auth.loggedIn);

    return redirect("/"); // Chuyển hướng về trang chủ hoặc trang dashboard
  }
}
