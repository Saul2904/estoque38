import connection from './connection.mjs';

const allBrands = async () => {
    const brands = await connection.query(`SELECT * FROM tb_marca`);
    return brands;
};

const cadBrand = async (brandName) =>{
    const brand = await connection.query(`INSERT INTO tb_marca(mc_nome) VALUES('${brandName}');`)
    return brand;
}

export { allBrands, cadBrand };