import PropTypes from 'prop-types';
import { useState } from 'react';
const Truncate = ({ children, maxLength }) => {
  const [hidden, setHidden] = useState(true);
  if (typeof children !== 'string' || children.trim().length === 0) {
    return null;
  }
  if (children.length <= maxLength) {
    return <span>{children}</span>;
  }
  return (
    <span>
      {hidden ? `${children.substr(0, maxLength).trim()} ...` : children}
      {hidden ? (
        <a style={{cursor:"pointer",color:"grey",marginLeft:"auto",fontSize:"14px",fontWeight:"bold",textDecoration:"underline",textDecorationColor:"grey",textDecorationThickness:"1px",textDecorationStyle:"dotted",paddingLeft:"auto",position:"relative",display:"inline",float:"right",userSelect:"none"}} onClick={() => setHidden(false)}>read more</a>
      ) : (
        <a style={{cursor:"pointer",color:"grey",marginLeft:"auto",fontSize:"14px",fontWeight:"bold",textDecoration:"underline",textDecorationColor:"grey",textDecorationThickness:"1px",textDecorationStyle:"dotted",paddingLeft:"auto",position:"relative",display:"inline",float:"right",userSelect:"none"}} onClick={() => setHidden(true)}>read less</a>
      )}
    </span>
  );
};
export default Truncate;
Truncate.propTypes = {
  children: PropTypes.node.isRequired,
  maxLength: PropTypes.number.isRequired,
};