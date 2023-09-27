import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'

function AuthPage(props) {
  return (
    <main>
      <h1>Welcome To Dragon Ball Z </h1>
      <h3>Sing Up to see your Characters</h3>
      <SignUpForm setUser={props.setUser} />
      <LoginForm setUser={props.setUser} />
    </main>
  )
}

export default AuthPage