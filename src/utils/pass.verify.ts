import bcrypt from "bcrypt";

async function verifyPassword() {
  const myPassword: string = 'admin123';
  const hash = '$2b$10$hHULTxitLNRJT0hN/IeIAOe95Sm0kAAKR.XMI8drJmA1FbH6L1Qki';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword()
