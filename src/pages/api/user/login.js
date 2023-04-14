import dbConnect from "@/lib/dbConnect"
import User from "@/models/userModel"
import bcrypt from "bcrypt"

const dbName = "Utilisateur"
console.log("Connecting to database...")
dbConnect(dbName)
console.log("Connected to database")

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "POST":
      try {

        const { username, password } = req.body

        const user = await User.findOne({ username: { $regex: `^${username}$`, $options: "i" } })

        if (!user) {
          res.status(404).send({ message: "L'utilisateur n'existe pas!", error: error.message })
          return 
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          res.status(401).send({ message: "Mot de passe incorrect!" })
          return
        }

        const userObject = user.toObject()
        delete userObject.password

        res.status(200).json({ success: true, message: "Utilisateur connecté avec succès", user: userObject })
      } catch (err) {
        res.status(400).json({ success: false, message: "Impossible de connecter l'utilisateur", error: err })
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
