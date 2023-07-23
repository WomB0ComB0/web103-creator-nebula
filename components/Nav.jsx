import { NavLink } from "react-router-dom"
import { IconContext } from "react-icons/lib";
const Nav = () => {
  const navLinks = [ {text:"Add Creator", href: "/new"}, {text:"Show Creator", href: "/"} ]
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
    <nav style={{height:"50px",display:"flex",alignItems:"center",justifyContent:"space-between",paddingInline:"20px"}}>
      <NavLink onClick={() =>  window.location.reload()} className={({isActive})=>isActive ? `isActive` : ``} style={{fontSize:"30px",fontWeight:"bolder",textDecoration:"none",justifySelf:"start",cursor:"pointer",color:"#fff"}}>
        CreatorVerse
      </NavLink>
      <ul style={{}}>
        {navLinks.map((item, index)=>(
          <li key={index}>
            <NavLink to={`${item.href}`}>
              <h4 style={{margin:"0"}}>
                {item.text}
              </h4>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    </IconContext.Provider>
  )
}
export default Nav