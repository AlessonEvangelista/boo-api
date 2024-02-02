import express, { response } from 'express';
import { database } from '../database/conn.js';

import profileModel from '../models/profile.model.js';
import commentModel from '../models/comment.model.js';

export const commentRoutes = express.Router();

commentRoutes.get('/api/comments/:profileId', async (req, res) => {
  
  const { sort, filter = {} } = req.query;
  const findOptions = {profileId: req.params.profileId};
  
  if ( filter.mbti ) {
    findOptions.mbti = filter.mbti
  }
  if ( filter.enneagram ) {
    findOptions.enneagram = filter.enneagram
  }

  const query = commentModel.find(findOptions);
  switch(sort) {
    case 'recent':
        query.sort({ date: 'desc' })
        break;
    case 'best':
        // Mongoose interprect to array lenth
        query.sort({ likes: 'desc' })
        break;
  }

  const comments = await query;
  res.json(comments);
});

commentRoutes.post('/api/comments', async function(req, res) {  
  try {
    const profile = await profileModel.findOne({id: req.body.userId})

    if(profile) {
        const comment = new commentModel({
            ...req.body,
            enneagram: profile.enneagram,
            mbti: profile.mbti
        })
        
        const newComment = await comment.save();
        return res.json(newComment)
    } else {
        throw new Error ('Profile not found')
    }
  } catch (error) {
    res.status(500);
    res.json({msg: error.message || "Invalid Request"});
  }
});

commentRoutes.post('/api/comments/like', async function(req, res) {  
    try {
        const comment = await commentModel.findOne({_id: req.body.commentId});

        comment.likes.push({
            userId: req.body.userId
        })
        
        return res.json( await comment.save() );
    } catch (error) {
      res.status(500);
      res.json({msg: error.message || "Invalid Request"});
    }
});

commentRoutes.post('/api/comments/unlike', async function(req, res) {  
    try {
        const comment = await commentModel.findOne({_id: req.body.commentId});

        comment.likes = comment.likes.filter( like => like.userId !== req.body.userId )
        
        return res.json( await comment.save() );
    } catch (error) {
      res.status(500);
      res.json({msg: error.message || "Invalid Request"});
    }
});