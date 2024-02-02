import mongoose from "mongoose";

const likesModel = new mongoose.Schema({ 
    userId: { type: Number },
    date: { type: Date, default: Date.now }
});
const commentModel = new mongoose.Schema({
    title : { type: String,  },
    description : { type: String },
    userId : { type: Number },
    profileId : { type: Number },
    enneagram : { type: String },
    mbti : { type: String },
    date: { type: Date, default: Date.now },
    likes :{ type: [likesModel], default: [] }
});

export default mongoose.models.commentModel || mongoose.model('comment', commentModel);