export { default } from "next-auth/middleware";// applies to whole proj
export const config = { matcher: [
    "/community/:path*",
    "/aboutUs/:path*",
    "/communityList/:path*",
    "/createcommunity/:path*",
    "/joinComm/:path*",
    "/"
] }