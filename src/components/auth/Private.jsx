import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function Private(props) {

  const {isLoggedIn} = useContext(AuthContext)

  if(isLoggedIn) {
    return props.children
    // Está renderizando el componente PrivatePageExample.. que estaba envuelto por este componente 'private'
  } else {
    return <Navigate to={"/login"} />
  }


}

export default Private