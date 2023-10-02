import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
import './NavBar.css'

function NavBar(props) {

  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    props.setUser(null);
  }

  return (
    <nav>
      <h1>Welcome, {props.user.name}</h1>
      <Link to="/characters">Character History</Link>
      &nbsp; | {" "}
      <Link to="/characters/new">New Character</Link>
      <br />
    
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}

export default NavBar