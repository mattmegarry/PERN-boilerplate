"use strict";

export default function send(req, res) {
  const { status, data, authCookie } = res.locals;

  if (authCookie) {
    if (authCookie.value === "remove") {
      res.clearCookie(authCookie.name, { httpOnly: true }); // TO DO: ADD SECURE HERE IN PROD (ie https)
    } else {
      res.cookie(authCookie.name, authCookie.value, { httpOnly: true }); // TO DO: ADD SECURE HERE IN PROD (ie https)
    }
  }

  res.status(status).json(data);
}
