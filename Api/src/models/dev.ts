import { Schema, model, Document } from 'mongoose'

interface DevModel extends Document{
    name: string,
    user: string,
    bio?: string,
    avatar: string,
    image: string,
    likes: Schema.Types.ObjectId[],
    dislikes: Schema.Types.ObjectId[],

}

const PostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'modelDev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'modelDev'
  }]
}, { timestamps: true })

export default model<DevModel>('modelDev', PostSchema)
