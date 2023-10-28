import {allBrands, cadBrand, oneBrand, updateBrand} from '../models/brandModel.mjs';

const getBrands = async (req, res) => {
    try{
        const valores = (await allBrands()).rows;
        return res.status(200).json(valores);
    }catch{
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const getBrand = async(req, res) => {
  try{
    const { id } = req.params;
    const valor = (await oneBrand(id)).rows;
    return res.status(200).json(valor);
  }catch{
    return res.status(401).json({"message":"Falha na requisição"});
  }
}

const registerBrand = async (req, res) =>{
 try{
    const resultRegister = await cadBrand(req.body.brand);
    return res.status(201).json(resultRegister.rowCount);
  }catch(err){
    if(err.code=='23505'){
      return res.status(403).json({"message":`A marca ${req.body.brand} já existe e não pode ser cadastrada novamente!`});
    }else{
      return res.status(400).json({"message":`Falha na requisição`});
    }
  }
}

const putBrand = async (req, res) =>{
  try{
    const id = req.params.id;
    const brand = req.body.brand;
    const resultUpdate = await updateBrand(id, brand);
    return res.status(202).json(resultUpdate.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

export { getBrands, registerBrand, getBrand, putBrand };