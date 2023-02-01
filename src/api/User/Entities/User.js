const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { username: { $type: "string" } },
      },
      set: (v) => (v === "" ? null : v),
      default: null,
    },
    emailAddress: {
      type: String,
      trim: true,

      index: {
        unique: true,
        partialFilterExpression: { emailAddress: { $type: "string" } },
      },
      set: (v) => (v === "" ? null : v),
      default: null,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["Owner", "Manager", "Member", "ADMIN"],
      default: "Owner",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    superAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    crewIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crew",
      },
    ],
  },
  { timestamps: true }
);

// hash user password before saving into database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password == null) {
    return next();
  }

  this.password = await bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema);
