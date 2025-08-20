// import crypto from "crypto";

// export const generateIdempotencyKey = (data: object): string => {
//   const stringData = JSON.stringify(data); // convert object to string
//   return crypto.createHash("sha256").update(stringData).digest("hex");
// };

import { v4 as uuidv4 } from "uuid";

export const generateIdempotencyKey = (): string => {
  return uuidv4();
};