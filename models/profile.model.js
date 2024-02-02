import mongoose from "mongoose";

const profileModel = new mongoose.Schema({
    id : { type: Number,  },
    name : { type: String },
    description : { type: String },
    mbti : { type: String },
    enneagram : { type: String },
    variant : { type: String },
    tritype : { type: Number },
    socionics : { type: String },
    sloan : { type: String },
    psyche : { type: String },
    image : { type: String } 
});

export default mongoose.models.profileModel || mongoose.model('profile', profileModel);