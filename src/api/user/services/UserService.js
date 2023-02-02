const bcrypt = require("bcrypt");
const userRepo = require("../repository/UserRepo");

exports.create = async (data) => {
  return await userRepo.create(data)
};
exports.getAll = async () => {
  return await userRepo.find();
};

exports.getUserById = async (id) => {
  console.log('id------->', id)
  return await userRepo.findById(id);
};

exports.update = async (User_id, data) => {
  if (!!data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  return await userRepo.findByIdAndUpdate(User_id, data, { new: true });
};

exports.updatePassword = async (emailAddress, data) => {
  return await userRepo.findOneAndUpdatePassword({ emailAddress: emailAddress }, data, {
    new: true,
  });
};

exports.deleteUser = async (User_id) => {
  return await userRepo.deleteUser(User_id);
};
