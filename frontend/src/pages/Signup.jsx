import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title=" Explore reviews effortlessly with WebMine for free."
      description1="Uncover insights, elevate decisions."
      description2=" Access curated reviews and empower your decisions."
      
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup