import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Log in to access curated reviews and empower your decisions."
      description2=" Access curated reviews and empower your decisions."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login