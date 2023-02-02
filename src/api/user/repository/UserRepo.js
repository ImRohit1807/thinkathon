const User = require('../entities/User');
const bcrypt = require('bcrypt');

exports.create = async (data) => {
  return await User.create(data);
};

exports.find = async () => {
  return await User.find().sort({ updatedAt: -1 });
};

exports.findById = async (id) => {
  return await User.findById(id).populate([{ path: 'crewIds' }]);
};

// exports.getUser = async (data) => {
//     const { username } = data;
//     return await User.findOne({ username });
// };

exports.findByIdAndUpdate = async (userId, data) => {
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  return await User.findByIdAndUpdate(userId, data, { new: true });
};

exports.findOneAndUpdatePassword = async (emailAddress, data) => {
  return await User.findOneAndUpdate({ emailAddress }, data, {
    new: true
  });
};
exports.deleteUser = async (userId) => {
  return await User.findByIdAndRemove(userId);
};
