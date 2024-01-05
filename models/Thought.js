const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    match: /^.{1,280}$/,
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      match: /^.{1,280}$/,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("formatDate").get(function () {
  return this.createdAt.toLocaleString();
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
