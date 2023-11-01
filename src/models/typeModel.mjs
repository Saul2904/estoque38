import connection from './connection.mjs';

const allTypes = async () => {
    const types = await connection.query(`SELECT * FROM tb_tipo`);
    return types;
};

const oneType = async (typeId) => {
    const type = await connection.query(`SELECT * FROM tb_tipo where tp_id = ${typeId}`);
    return type;
};

const cadType = async (typeDesc) =>{
    const type = await connection.query(`INSERT INTO tb_tipo(tp_descricao) VALUES('${typeDesc}');`)
    return type;
}

const updateType = async (typeId,typeDesc) =>{
    const type = await connection.query(`UPDATE tb_tipo SET tp_descricao = '${typeDesc}' WHERE tp_id = ${typeId}`);
    return type;
}

export { allTypes, cadType, oneType, updateType };