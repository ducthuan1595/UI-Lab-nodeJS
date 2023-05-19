import { createContext, useEffect, useState } from "react";

export const context = createContext();


const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userCurrent'))?? null);
  // setUser(JSON.parse(localStorage.getItem('userCurrent'))?? null);
  const value = {
    user,
    setUser,
  }
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )
}

export default StoreProvider;