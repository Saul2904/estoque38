import {allProducts, cadProduct, oneProduct, updateProduct} from '../models/productModel.mjs';

const getProducts = async (req, res) => {
    try{
        const valores = (await allProducts()).rows;
        return res.status(200).json(valores);
    }catch{
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const getProduct = async(req, res) => {
  try{
    const valor = (await oneProduct(req.params.id)).rows;
    return res.status(200).json(valor);
  }catch{
    return res.status(401).json({"message":"Falha na requisição"});
  }
}

const registerProduct = async (req, res) =>{
 try{
    const {brand, type, model, desc} = req.body;
    const resultRegister = await cadProduct(brand, type, model, desc);
    return res.status(201).json(resultRegister.rowCount);
  }catch(err){
    if(err.code=='23505'){
      return res.status(403).json({"message":`O produto já existe e não pode ser cadastrado novamente!`});
    }else{
      return res.status(400).json({"message":`Falha na requisição`});
    }
  }
}

const putProduct = async (req, res) =>{
  try{
    const id = req.params.id;
    const {brand, type, model, desc} = req.body;
    const resultUpdate = await updateProduct(id, brand, type, model, desc);
    return res.status(202).json(resultUpdate.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

export { getProducts, registerProduct, getProduct, putProduct };