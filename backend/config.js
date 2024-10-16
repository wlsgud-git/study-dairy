import dotenv from "dotenv";
dotenv.config();

function requires(key) {
  let info = process.env[key] || undefined;
  // if (!info) throw new Error(`${key} don't have`);
  return info;
}

export const config = {
  http: {
    port: requires("PORT"),
  },

  database: {
    user: requires("DB_USER"),
    password: requires("DB_PASSWORD"),
    host: requires("DB_HOST"),
    database: requires("DB_DATABASE"),
    port: requires("DB_PORT"),
  },

  // database: {
  //     name: requires('DB_NAME'),
  //     password: requires('DB_PASSWORD'),
  //     host : requires("DB_HOST"),
  // }
};
