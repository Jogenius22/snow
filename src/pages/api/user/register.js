import dbConnect from "@/lib/dbConnect"
import User from "@/models/userModel"

const dbName = "Utilisateur"
dbConnect(dbName)

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      try {

        const users = await User.find()

        res.status(201).json({ success: true, message: "Récupération des utilisateurs avec succès", users })
      } catch (error) {
        res.status(400).json({ success: false, message: "Impossible de créer le compte", error: error.message })
      }
      break
    case "POST":
      try {

        const user = await User.create(req.body)

        res.status(201).json({ success: true, message: "Utilisateur créé avec succès", user })
      } catch (error) {
        res.status(400).json({ success: false, message: "Impossible de créer le compte", error: error.message })
      }
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
