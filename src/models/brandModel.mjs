import connection from './connection.mjs';

const allBrands = async () => {
    const brands = await connection.query(`SELECT * FROM tb_marca`);
    return brands;
};

const oneBrand = async (brandId) => {
    const brand = await connection.query(`SELECT * FROM tb_marca where mc_id = ${brandId}`);
    return brand;
};

const cadBrand = async (brandName) =>{
    const brand = await connection.query(`INSERT INTO tb_marca(mc_nome) VALUES('${brandName}');`)
    return brand;
}

const updateBrand = async (brandId,brandName) =>{
    const brand = await connection.query(`UPDATE tb_marca SET mc_nome = '${brandName}' WHERE mc_id = ${brandId}`);
    return brand;
}

export { allBrands, cadBrand, oneBrand, updateBrand };