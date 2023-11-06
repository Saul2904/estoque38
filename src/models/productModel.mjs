import connection from './connection.mjs';

const allProducts = async () => {
    const products = await connection.query(`SELECT pd_id, mc_id,mc_nome, tp_id,tp_descricao, pd_modelo, pd_descricao FROM tb_produto p
    LEFT JOIN tb_marca m ON p.pd_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pd_tipo = t.tp_id;`);
    return products;
};

const oneProduct = async (prodId) => {
    const product = await connection.query(`SELECT pr_id, mc_id,mc_nome, tp_id,tp_descricao, pr_modelo, pr_descricao FROM tb_produto p
    LEFT JOIN tb_marca m ON p.pr_marca = m.mc_id
    LEFT JOIN tb_tipo t ON p.pr_tipo = t.tp_id where pt_id = ${prodId}`);
    return product;
};

const cadProduct = async (prodBrand, prodType, prodModel, prodDesc) =>{
    const product = await connection.query(`INSERT INTO tb_produto(pr_marca, pr_tipo,  pr_modelo, pr_descricao) 
    VALUES(${prodBrand}, ${prodType}, '${prodModel}', '${prodDesc}');`)
    return product;
}

const updateProduct = async (prodId,prodBrand, prodType, prodModel, prodDesc) =>{
    const product = await connection.query(`UPDATE tb_produto SET 
    pr_marca = ${prodBrand}, 
    pr_tipo = ${prodType}, 
    pr_modelo = '${prodModel}',
    pr_descricao = '${prodDesc}'
    WHERE pr_id = ${prodId}`);
    return product;
}

export { allProducts, cadProduct, oneProduct, updateProduct };