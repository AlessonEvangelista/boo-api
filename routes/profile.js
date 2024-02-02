import express, { response } from 'express';
import { database } from '../database/conn.js';
import profileModel from '../models/profile.model.js';
import { nextId } from '../models/sequential.model.js';


export const profileRoutes = express.Router();

profileRoutes.get('/profile/:id', async (req, res, next) => {
  
  const profile = await profileModel.findOne({id: req.params.id})

  if(profile) {
    res.render('profile_template', {
      profile
    });
  } else {
    res.end('Error 404');
  }
});

profileRoutes.post('/api/profile', async function(req, res) {  
  try {
    const id = await nextId('profile');
    const profile = new profileModel({
      ...req.body,
      id
    })
    
    const newProfile = await profile.save();
    return res.json(newProfile)
  } catch (error) {
    res.status(500);
    res.json({msg:"Invalid Request", error});
  }
});