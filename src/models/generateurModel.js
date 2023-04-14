import _db from "mongoose"

const GenerateurSchema = new _db.Schema(
  {
    compte: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    jeu: {
      type: String,
      required: true,
    },
    statut: {
      type: String,
      required: true,
    },
    user: {
      type: _db.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
  },
)

export default _db.models.account || _db.model("account", GenerateurSchema)