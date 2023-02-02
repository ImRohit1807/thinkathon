const bcrypt = require('bcrypt');
const userRepo = require('../repository/UserRepo');

exports.create = async (data) => {
  return await userRepo.create(data);
};
exports.getAll = async () => {
  return await userRepo.find();
};

exports.getUserById = async (id) => {
  return await userRepo.findById(id);
};

exports.update = async (userId, data) => {
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  return await userRepo.findByIdAndUpdate(userId, data, { new: true });
};

exports.updatePassword = async (emailAddress, data) => {
  return await userRepo.findOneAndUpdatePassword({ emailAddress }, data, {
    new: true
  });
};

exports.deleteUser = async (userId) => {
  return await userRepo.deleteUser(userId);
};
