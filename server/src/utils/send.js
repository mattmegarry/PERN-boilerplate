"use strict";

export default function send(req, res) {
  const { status, data, authCookie } = res.locals;

  if (authCookie) {
    if (authCookie.value === "remove") {
      res.clearCookie(authCookie.name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
      });
    } else {
      res.cookie(authCookie.name, authCookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
      });
    }
  }

  res.status(status).json(data);
}
