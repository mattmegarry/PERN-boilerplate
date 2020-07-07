"use strict";

export default function send(req, res) {
  const { status, data } = res.locals;
  res.status(status || 200).json(data);
}