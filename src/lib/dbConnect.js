import mongoose from "mongoose"

const connection = {}

async function dbConnect(dbName) {
  if (connection[dbName]) {
    return
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    connection[dbName] = db.connections[0].readyState
  } catch (error) {
    console.error("Error connecting to database:", error)
  }
}

export default dbConnect
