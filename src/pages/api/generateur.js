import dbConnect from "@/lib/dbConnect"
import Generateur from "@/models/generateurModel"

const dbName = "Generateur"
dbConnect(dbName)

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      try {
        const allAccount = await Generateur.find({}) // Récupérer tous les comptes
        res.status(200).json({ success: true, data: allAccount })
      } catch (error) {
        res.status(400).json({ success: false, message: "Impossible de récupérer les comptes", error: error.message })
      }
      break
    case "POST":
      try {
        const generateur = await Generateur.create(req.body) // Créer un nouveau compte
        res.status(201).json({ success: true, data: generateur })
      } catch (error) {
        res.status(400).json({ success: false, message: "Impossible de créer le compte", error: error.message  })
      }
      break
    case "DELETE":
      try {
        const deleted = await Generateur.deleteOne({ _id: req.body.id }) // Supprimer un compte
        res.status(200).json({ success: true, data: deleted })
      } catch (error) {
        res.status(400).json({ success: false, message: "Impossible de supprimer le compte", error: error.message  })
      }
      break
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
