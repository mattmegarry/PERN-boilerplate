"use strict";

import bcrypt from "bcrypt";

export const hashSaltPassword = plaintextPassword => {
  return bcrypt.hash(plaintextPassword, 12);
};
