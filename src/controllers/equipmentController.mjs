import {allEquipments, cadEquipment, oneEquipment, updateEquipment} from '../models/equipmentModel.mjs';

const getEquipments = async (req, res) => {
    try{
        const valores = (await allEquipments()).rows;
        return res.status(200).json(valores);
    }catch{
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const getEquipment = async(req, res) => {
  try{
    const valor = (await oneEquipment(req.params.id)).rows;
    return res.status(200).json(valor);
  }catch{
    return res.status(401).json({"message":"Falha na requisição"});
  }
}

const registerEquipment = async (req, res) =>{
 try{
    const {product, patrimony, serial, observation} = req.body;
    const resultRegister = await cadEquipment(product, patrimony, serial, observation);
    return res.status(201).json(resultRegister.rowCount);
  }catch(err){
    if(err.code=='23505'){
      return res.status(403).json({"message":`O equipamento de patrimônio ${patrimony} e/ou serial ${serial} já existe e não pode ser cadastrado novamente!`});
    }else{
      return res.status(400).json({"message":`Falha na requisição`});
    }
  }
}

const putEquipment = async (req, res) =>{
  try{
    const id = req.params.id;
    const {product, patrimony, serial, observation} = req.body;
    const resultUpdate = await updateEquipment(id, product, patrimony, serial, observation);
    return res.status(202).json(resultUpdate.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

export { getEquipments, registerEquipment, getEquipment, putEquipment };