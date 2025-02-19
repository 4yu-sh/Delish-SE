import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },

  {
    name: "Super Admin",
    email: "super@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isSuperAdmin: true,
  },
];

export default users;
