import dbConnect from "@/lib/dbConnect"
const mongoose = require("mongoose")

export default async function handler(req, res) {
  const { serverName, dbName } = req.query

  if (req.method === "GET") {
    try {
      // Attendre la connexion à la base de données
      await dbConnect(dbName)

      // Vérifier si la collection existe
      const collections = await mongoose.connection.db.listCollections().toArray()
      const collectionExists = collections.some((collection) => collection.name === serverName)

      if (!collectionExists) {
        res.status(405).json({ message: `${serverName} n'existe pas` })
        return
      }

      // Récupérer la collection sans créer de modèle
      const collection = mongoose.connection.db.collection(serverName)

      // Utiliser la méthode toArray() pour récupérer les documents sous forme de tableau
      const cursor = collection.find({})
      const data = await cursor.toArray()

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des données:", error})
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée." })
  }
}
