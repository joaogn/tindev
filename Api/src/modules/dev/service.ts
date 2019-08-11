import modelDev from '../../models/dev'
import axios from 'axios'

// The service class serves to implement our CRUDS or our Business Rules

class Dev {
  constructor () {}

  async create (user: string) {
    const userExists = await modelDev.findOne({ user })

    const response = await axios.get(`https://api.github.com/users/${user}`)

    if (userExists) {
      console.log(userExists)
      return userExists
    }

    const { name, bio, avatar_url: avatar } = response.data
    return modelDev.create({
      name,
      user,
      bio,
      avatar
    })
  }

  async like (id: string, user: string) {
    const loggedDev = await modelDev.findById(user)
    const targetDev = await modelDev.findById(id)

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('deu match')
    }

    if (targetDev) {
      loggedDev.likes.push(targetDev._id)

      await loggedDev.save()

      return loggedDev
    }
  }

  async dislike (id: string, user: string) {
    const loggedDev = await modelDev.findById(user)
    const targetDev = await modelDev.findById(id)

    if (targetDev) {
      loggedDev.dislikes.push(targetDev._id)

      await loggedDev.save()

      return loggedDev
    }
  }

  async getDevs (user: string) {
    const loggedDev = await modelDev.findById(user)

    return modelDev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })
  }
}

export default new Dev()
