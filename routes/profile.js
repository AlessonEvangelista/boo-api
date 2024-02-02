import express from 'express';
import profileModel from '../models/profile.model.js';
import { nextId } from '../models/sequential.model.js';

export const profileRoutes = express.Router();

profileRoutes.get('/?:id?', async (req, res, next) => {
  let profile = {};
  if(req.params.id !== undefined) {
    profile = await profileModel.findOne({id: req.params.id})
  } else {
    profile = await profileModel.find({});
  }

  return res.json(profile);
});

profileRoutes.post('/', async function(req, res) {  
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