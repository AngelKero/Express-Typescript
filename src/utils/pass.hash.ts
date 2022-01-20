import bcrypt from "bcrypt";

async function hashPassword() {
  const myPassword: string = 'admin123';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword()
