import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
  const token = req.cookies["next-auth.session-token"]

  if (!token) {
    return res.status(401).json({ message: "Token d'authentification manquant" })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken.user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token d'authentification invalide" })
  }
}
