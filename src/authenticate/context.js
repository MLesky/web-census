import { createContext, useMemo, useState } from "react";

const AuthContext = createContext({
  username: "",
  password: "",
  createNewSession: (name, pass) => {},
});

function UserSession({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") ?? ""
  );

  const admin = useMemo(
    () => ({
      username: username,
      password: password,
      createNewSession: (name, pass) => {
        localStorage.setItem("username", name);
        localStorage.setItem("password", pass);
        setPassword(name);
        setUsername(pass);
        console.log('SET to', name, pass)
      },
    }),
    [username, password]
  );

  console.log("User Info", admin);

  return <AuthContext.Provider value={admin}>{children}</AuthContext.Provider>;
}

export { UserSession, AuthContext };
