import {login as logar} from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const resultLogin = await logar(req.body.email, req.body.pwd);
    if(resultLogin.rowCount > 0){
      const id = resultLogin.rows[0].us_id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3000
      });
      return res.status(202).json({user: id, auth: true, token: token});
    }else{
      return res.status(203).json({message: 'Login inválido!'});
    }
};

export { login };