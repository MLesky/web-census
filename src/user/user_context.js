import { createContext, useContext, useMemo, useState } from "react";

const data = {
    id: "",
    dateOfBirth: "",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
    malesAbove21: 0,
    femalesAbove21: 0,
    malesBelow21: 0,
    femalesBelow21: 0,
  };

const err = {
    id: "",
    dateOfBirth: "",
    firstName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
  };

const UserContext = createContext();

function UserContextProvider({children}){
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState(data);
    const [errors, setErrors] = useState(err);

    const updateUser = (fields) => {
        setUser((prevUser) => ({...prevUser, ...fields}));
        console.log('User updated', user)
    }

    const updateErrors = (fields) => {
        setErrors((prevErrors) => ({...prevErrors, ...fields}));
        console.log('Errors updated', errors)
    }

    return (
        <UserContext.Provider value={{user, errors, index, updateUser, updateErrors, setIndex}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext };
