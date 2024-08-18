import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./Context";

// Interfaces
import { RequestResponse, UserData } from "./Interfaces";

// Components
import Dashboard from "./components/main/Main";
import AddWords from "./components/main/AddWords";
import Booklet from "./components/main/Booklet";
import AddBooklet from "./components/main/AddBooklet";
import EditBooklet from "./components/main/EditBooklet";
import Header from "./components/other/Header";
// import { get } from "./Network";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import { NoPage } from "./components/other/NoPage";
import { get } from "./Network";
import SharedBooklet from "./components/main/SharedBooklet";

function App(): React.ReactElement {
  // Context
  const [user, setUser] = useState<UserData>(undefined);

  // Environment variables are as easy as that! Just don't forget to prefix them with VITE_.
  // console.debug(import.meta.env.VITE_GOOGLE_CLIENT_ID)

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("danishSquaresUser") || "{}")
    if (!tempUser.token) {
      setUser(null)
      return
    }

    setUser(tempUser)
    updateUser(tempUser)

    // Update user
    interface responseType {
      owner: string;
      name: string;
      public: boolean;
      words: {
        english: string;
        danish: string;
        audio: string;
        audioSlow: string;
      }[]
    }
    async function updateUser(tempUser: UserData): Promise<void> {
      const response: RequestResponse<responseType[]> = await get("auth/get-updates", { token: tempUser?.token })
      if (response.success && tempUser?.username) {
        setUser({
          ...tempUser,
          books: response.data.map(book => { return { name: book.name, words: book.words }})
        })
      }
    }
  }, [])

  useEffect(() => {
    if (user === undefined) {
      return
    }
    if (user?.token) {
      localStorage.setItem("danishSquaresUser", JSON.stringify(user))
      console.log("User changed.")
    } else {
      localStorage.removeItem("danishSquaresUser")
      console.log("Signed out.")
    }
  }, [user])

  // Component
  if (user === null || user === undefined) {
    return (
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter basename="/danish-squares">
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Signin />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="sign-in" element={<Signin />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter basename="/danish-squares">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="book/edit/:book" element={<EditBooklet />} />
            <Route path="book/:book" element={<Booklet />} />
            <Route path="shared/:book" element={<SharedBooklet />} />
            <Route path="add" element={<AddWords />} />
            <Route path="add-booklet" element={<AddBooklet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;