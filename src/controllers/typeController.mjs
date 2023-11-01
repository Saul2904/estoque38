import {allTypes, cadType, oneType, updateType} from '../models/typeModel.mjs';

const getTypes = async (req, res) => {
    try{
        const valores = (await allTypes()).rows;
        return res.status(200).json(valores);
    }catch(err){
       console.log(err);
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const getType = async(req, res) => {
  try{
    const valor = (await oneType(req.params.id)).rows;
    return res.status(200).json(valor);
  }catch{
    return res.status(401).json({"message":"Falha na requisição"});
  }
}

const registerType = async (req, res) =>{
 try{
    const resultRegister = await cadType(req.body.type);
    return res.status(201).json(resultRegister.rowCount);
  }catch(err){
    if(err.code=='23505'){
      return res.status(403).json({"message":`A marca ${req.body.type} já existe e não pode ser cadastrada novamente!`});
    }else{
      return res.status(400).json({"message":`Falha na requisição`});
    }
  }
}

const putType = async (req, res) =>{
  try{
    const id = req.params.id;
    const type = req.body.type;
    const resultUpdate = await updateType(id, type);
    return res.status(202).json(resultUpdate.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

export { getTypes, registerType, getType, putType };