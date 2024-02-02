import mongoose from "mongoose";

const sequentialSquema = new mongoose.Schema({
    type : { type: String },
    sequential : { type: Number },
});
const sequentialModel = mongoose.model('sequential', sequentialSquema);

/**
 * @param {string} type 
 */
export async function nextId(type)
{
    const next = await sequentialModel.findOne({type})

    if(next){
        await sequentialModel.updateOne({ type }, {
            sequential: next.sequential+1
          });
          
    } else {
        await sequentialModel.create({
            type,
            sequential: 2
        });
        return 1
    }
    return next.sequential;
}