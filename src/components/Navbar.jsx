import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticatedUser } = useContext(AuthContext)

  const handleLogout = async() => {

    try {
      localStorage.removeItem("authToken")  // Elimino token

      await authenticatedUser() // Validar el token, la función cambia los estados

      navigate("/")

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {!isLoggedIn && <Link to="/signup">Registro</Link>}
      {!isLoggedIn && <Link to="/login">Acceso</Link>}
      {isLoggedIn && <Link to="/private-page-example">Ejemplo Privado</Link>}
      {isLoggedIn && <Link onClick={handleLogout}>Cerrar sesión</Link>}
    </nav>
  );
}

export default Navbar;
