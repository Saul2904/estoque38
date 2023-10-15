import {allBrands, cadBrand} from '../models/brandModel.mjs';

const getAllBrands = async (req, res) => {
    try{
        const valores = (await allBrands()).rows;
        return res.status(200).json(valores);
    }catch{
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const registerBrand = async (req, res) =>{
 try{
    console.log(req.body.brand);
    const resultRegister = await cadBrand(req.body.brand);
    return res.status(201).json(resultRegister.rowCount);
  }catch{
    return res.status(400).json({"message":"Falha ao realizar o cadastro"});
  }
}

export { getAllBrands, registerBrand };