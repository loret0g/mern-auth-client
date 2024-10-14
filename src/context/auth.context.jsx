import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Hay que crear dos componentes
//* 1. Componente contexto
const AuthContext = createContext()
// Este contexto será utilizado para compartir estados y funciones relacionados con la autenticación a lo largo de toda la aplicación.

//* 2. Componente envoltorio
// Actuará como un envoltorio que rodeará los componentes que necesitan acceso al contexto de autenticación.

function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)  // spinner para que espere que se compruebe

  useEffect(() => {
    // Verifica si el usuario está logeado o no cuando visita la página
    // (cuanto en toda la página ocurre el componentDinMount)
    authenticatedUser()
  }, [])

  const authenticatedUser = async() => {
    // Función que llamará a la ruta /verify (que tenga token correcto) y nos actualiza los estados y se llama después de hacer login/logout o al volver a la app

    try {

      const authToken = localStorage.getItem("authToken") // nombre con el que no almacenamos 
      
      const response = await axios.get("http://localhost:5005/api/auth/verify", {
        headers: { authorization: `Bearer ${authToken}` }
      })

      console.log(response) 
      // el token es válido
      setIsLoggedIn(true)
      setIsLoggedIn(response.data._id)    // Comprobado desde el back, que nos envía el payload
      setIsValidatingToken(false)

    } catch (error) {
      // el token no es válido
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
    }

  }
  // Aquí definimos un objeto que contiene el estado y la función de autenticación
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticatedUser
  }

  if(isValidatingToken) {
    return <h3>...validando credenciales</h3>
  }

  return (
    // Usamos el `AuthContext.Provider` para compartir el `passedContext` con todos los componentes hijos.
    <AuthContext.Provider value={passedContext}> {/* Lo que va a compartir con toda la aplicación*/}
      {props.children}  
      {/* Es como tener esto: 
        <BrowserRouter>
          <App />
        </BrowserRouter>*/}
    </AuthContext.Provider>
  )

}

// Exportamos ambos componentes
export {
  AuthContext,    // Exportamos el contexto para que otros componentes lo utilicen.
  AuthWrapper     // Exportamos el envoltorio que usará el contexto para envolver la aplicación.
}