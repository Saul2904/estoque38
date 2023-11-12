import connection from './connection.mjs';

const allEquipments = async () => {
    const equipments = await connection.query(`SELECT eq_id, pr_id, tp_descricao, mc_nome,pr_modelo, pr_descricao,eq_patrimonio, eq_serial, eq_observacao FROM tb_equipamento e
    LEFT JOIN tb_produto p ON e.eq_produto = p.pr_id
    LEFT JOIN tb_marca m ON p.pr_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pr_tipo = t.tp_id;`);
    return equipments;
};

const oneEquipment = async (equipId) => {
    const equipment = await connection.query(`SELECT eq_id, pr_id, mc_nome, tp_descricao, pr_modelo, pr_descricao,eq_patrimonio, eq_serial, eq_observacao FROM tb_equipamento e
    LEFT JOIN tb_produto p ON e.eq_produto = p.pr_id
    LEFT JOIN tb_marca m ON p.pr_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pr_tipo = t.tp_id where pt_id = ${equipId}`);
    return equipment;
};

const cadEquipment = async (equipProd, equipPatrimonio, equipSerial, equipObserv) =>{
    const equipment = await connection.query(`INSERT INTO tb_equipamento(eq_produto, eq_patrimonio,  eq_serial, eq_observacao) 
    VALUES(${equipProd}, ${equipPatrimonio}, '${equipSerial}', '${equipObserv}');`)
    return equipment;
}

const updateEquipment = async (equipId,equipProd, equipPatrimonio, equipSerial, equipObserv) =>{
    const equipment = await connection.query(`UPDATE tb_equipamento SET 
    eq_produto = ${equipProd}, 
    eq_patrimonio = ${equipPatrimonio}, 
    eq_serial = '${equipSerial}',
    eq_observacao = '${equipObserv}'
    WHERE eq_id = ${equipId}`);
    return equipment;
}

export { allEquipments , cadEquipment, oneEquipment, updateEquipment };