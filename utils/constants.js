const constants = {
  NEXT_PUBLIC_VERCEL_URL:
    process.env.NEXT_PUBLIC_VERCEL_URL | "http://localhost:3000",
  SOCKET_PATH: "/api/socket"
};

export default constants;
