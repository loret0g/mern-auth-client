import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("")    // Manejar errores

  // Aquí se harían las validaciones en tiempo real
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const newUser = {
        email, 
        username, 
        password
      }   // Los datos (estados) del usuario

      await axios.post("http://localhost:5005/api/auth/signup", newUser)  // Ruta de backend, se valida el usuario

      navigate("/login")

    } catch (error) {
      console.log(error)  // Muestra el error que nos manda el back
      //! redirección a /error
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // Aquí debe redireccionar a una pag de error
      }
    }

    // ... contactar al backend para registrar al usuario aqui
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        {errorMessage && <p>{errorMessage}</p>}   
        {/* Ya muestra todos los errores que tenemos en el backend, ya sea el usuario repe, contraseña...  */}

      </form>
      
    </div>
  );
}

export default Signup;
