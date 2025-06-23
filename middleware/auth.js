import cookieparser from "cookieparser";

export default async function ({ store, redirect, req }) {
  if (process.server && req && req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie);
    const token = parsed.token;

    // console.log(token);

    if (!token) {
      // console.log("❌ Không có token, chuyển về login");
      return redirect("/login");
    } else {
      // console.log("✅ Có token, cho phép truy cập");
      return redirect("/");
    }
  }
}
