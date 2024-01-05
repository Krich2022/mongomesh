const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
        }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOne({
        _id: req.params.userId,
      });
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }

      const thoughts = await Thought.find({
        username: dbUserData.username,
      });
      for (const thought of thoughts) {
        await thought.remove();
      }

      const deleteUser = await User.delete(dbUserData);

      res.json({ message: "User Deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
