const { connection, connectionSP } = require("../database/connection");

module.exports = async () => {
  try {
    const query =
      "SELECT `id`, `lname`, `fname`, `username`, CAST(aes_decrypt(`password`, 'secretKey') as char) as password FROM users;";
    const result = await connection(query);
    return result;
  } catch (error) {
    return [];
  }
};
