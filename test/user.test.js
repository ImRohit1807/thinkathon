const UserService = require('../src/api/user/services/UserService');
const con = require('../src/database/db');

//Create
// test("response of post api", async () => {
//   const response = await UserService.create({
//           'username': 'test8',
//           'emailAddress': 'test8@gmail.com',
//           'password': 'test1@pass',
//           'role': 'Owner',
//           'name': 'test',
//           'superAdmin': false
//   });
//   expect(response.username).toBe("test8");
// });


//getAll
// test("response of getAll api", async () => {
//   const response = await UserService.getAll();
//   console.log(response);
//   expect(response).toBe(response);
// });


//update user
// test("response of updateUser api", async () => {
//   const params = { '_id':'63db78ae2a97b145ee1d2de8' };
//   const data = {
//     'username': 'testUpdated',
//     'emailAddress': 'testUpdated@gmail.com',
//     'password': 'test1@pass',
//     'role': 'Owner',
//     'name': 'test',
//     'superAdmin': false
//   }
//   const response = await UserService.update(params,data);
//   expect(data).toBe(data);
// });


// update password
// const mockData = {
//   _id: new ObjectId("63dcd6ea1131a52cf5ff5fc5"),
//   username: 'test',
//   emailAddress: 'test@gmail.com',
//   role: 'Owner',
//   name: 'test',
//   superAdmin: false,
//   crewIds: [],
//   createdAt: '2023-02-03T09:42:02.238Z',
//   updatedAt: '2023-02-03T09:42:02.238Z',
//   __v: 0
// }

test("response of updatePassword api", async () => {
  const params = { '_id':'63db78ae2a97b145ee1d2de8' };
  const data = {
    'username': 'testing',
    'password': 'test@pass',
  }
  const response = await UserService.update(params,data);
  console.log(response);
  expect(response.username).toBe(data.username);
});
