import _db from "mongoose"
import bcrypt from "bcrypt"

const UtilisateurSchema = new _db.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 15,
    },
    password: {
      type: String,
      required: true,
      // minlength: 12, // Minimum de 12 caractères
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/ // Exige au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: { 
      type: Date,
      required: false,
    },
    image: {
      type: String,
      default: "images/avatar-register.png",
      required: true,
    },
    role: {
      type: String,
      enum: ["Banni","Membre","Admin"],
      default: "Membre",
      required: true,
    }
  }
)

// Avant de sauvegarder un nouvel utilisateur, cryptez son mot de passe avec bcrypt
UtilisateurSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password") || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
  } else {
    return next()
  }
})

// Ajouter une méthode pour comparer le mot de passe en clair avec le mot de passe crypté
UtilisateurSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password)
}

export default _db.models.users || _db.model("users", UtilisateurSchema)