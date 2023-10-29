import connection from './connection.mjs';

const allMovements = async () => {
    const movements = await connection.query(`SELECT mv_id, mv_origem, mv_destino, mv_data_hora,mv_chamado,
    eq_id, eq_patrimonio, eq_serial, eq_observacao,
    pr_id, pr_modelo, pr_descricao,
    mc_id, mc_nome, 
    tp_id,tp_descricao 
    FROM tb_movimentacao mv
    LEFT JOIN tb_equipamento e ON mv.mv_equipamento = e.eq_id
    LEFT JOIN tb_produto p ON e.eq_produto = p.pr_id
    LEFT JOIN tb_marca m ON p.pr_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pr_tipo = t.tp_id;`);
    return movements;
};

const oneMovement = async (movId) => {
    const movement = await connection.query(`SELECT mv_id, mv_origem, mv_destino, mv_data_hora,mv_chamado,
    eq_id, eq_patrimonio, eq_serial, eq_observacao,
    pr_id, pr_modelo, pr_descricao,
    mc_id, mc_nome, 
    tp_id,tp_descricao 
    FROM tb_movimentacao mv
    LEFT JOIN tb_equipamento e ON mv.mv_equipamento = e.eq_id
    LEFT JOIN tb_produto p ON e.eq_produto = p.pr_id
    LEFT JOIN tb_marca m ON p.pr_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pr_tipo = t.tp_id where pt_id = ${movId}`);
    return movement;
};

const cadMovement = async (movEquip, movOrigin, movDestiny, movTicket) =>{
    const movement = await connection.query(`INSERT INTO tb_movimentacao(mv_equipamento, mv_origem,  mv_destino, mv_chamado) 
    VALUES(${movEquip}, ${movOrigin}, '${movDestiny}', '${movTicket}');`)
    return movement;
}

const updateMovement = async (movId,movEquip, movOrigin, movDestiny, movTicket) =>{
    const movement = await connection.query(`UPDATE tb_produto SET 
    mv_equipamento = ${movEquip}, 
    mv_origem = ${movOrigin}, 
    mv_destino = '${movDestiny}',
    mv_chamado = '${movTicket}'
    WHERE mv_id = ${movId}`);
    return movement;
}

export { allMovements , cadMovement, oneMovement, updateMovement };