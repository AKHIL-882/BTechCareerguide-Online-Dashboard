export const validate = (email, password) => {
  const emailvalue = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const passwordvalue =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (email === "" && password === "") {
    return "Email and password are required.";
  }
  if (email === "") {
    return "Please provide your email address.";
  }
  if (password === "") {
    return "Please provide your password.";
  }
  if (!emailvalue) {
    return "The email address entered is invalid.";
  }
  if (!passwordvalue) {
    return "The password is invalid";
  }

  return null;
};
