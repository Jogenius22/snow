import axios from "axios"

export default async function CheckModerateur(serverName) {
  try {
    const response = await axios.get(`/api/moderateur?serverName=${serverName}&dbName=Moderateur`)
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
  }
}
