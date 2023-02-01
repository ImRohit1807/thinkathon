const User = require("../Entities/User");
const bcrypt = require("bcrypt");
exports.create = async (data) => {
  return await User.create(data);
};
exports.getAll = async (filter) => {
  return await User.find(filter).sort({ updatedAt: -1 });
};

exports.get = async (id) => {
  console.log('id------->',id)
  return await User.findById(id).populate([{ path: "crewIds" }]);
};

exports.getUser = async (data) => {
  const { username } = data;
  return await User.findOne({ username });
};

exports.update = async (User_id, data) => {
  if (!!data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  return await User.findByIdAndUpdate(User_id, data, { new: true });
};

exports.updatePassword = async (emailAddress, data) => {
  return await User.findOneAndUpdate({ emailAddress: emailAddress }, data, {
    new: true,
  });
};
exports.delete = async (User_id) => {
  return await User.findByIdAndRemove(User_id);
};
