const connection = require('../database/connection')

exports.Create = async (username, password) => {
    try {
        const query = `INSERT INTO nodedb.new_table (username, password) VALUES ('${username}', md5('${password}'));`;
        await connection(query);

        return true;
    } catch (error) {
        return false;
    }
   
}