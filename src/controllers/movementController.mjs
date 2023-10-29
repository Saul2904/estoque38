import {allMovements, cadMovement, oneMovement, updateMovement} from '../models/movementModel.mjs';

const getMovements = async (req, res) => {
    try{
        const valores = (await allMovements()).rows;
        return res.status(200).json(valores);
    }catch{
        return res.status(401).json({"message":"Falha na requisição"});
    }
};

const getMovement = async(req, res) => {
  try{
    const valor = (await oneMovement(req.params.id)).rows;
    return res.status(200).json(valor);
  }catch{
    return res.status(401).json({"message":"Falha na requisição"});
  }
}

const registerMovement = async (req, res) =>{
 try{
    const {equipment, origin, destiny, ticket} = req.body;
    const resultRegister = await cadMovement(equipment, origin, destiny, ticket);
    return res.status(201).json(resultRegister.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

const putMovement = async (req, res) =>{
  try{
    const id = req.params.id;
    const {equipment, origin, destiny, ticket} = req.body;
    const resultUpdate = await updateMovement(id, equipment, origin, destiny, ticket);
    return res.status(202).json(resultUpdate.rowCount);
  }catch{
    return res.status(400).json({"message":`Falha na requisição`});
  }
}

export { getMovements, registerMovement, getMovement, putMovement };