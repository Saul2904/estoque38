import connection from './connection.mjs';

const login = async (email,pwd) => {
    const users = await connection.query(`SELECT us_id FROM tb_usuario where us_email = '${email}' and us_senha = '${pwd}'`);
    return users;
};

export { login };