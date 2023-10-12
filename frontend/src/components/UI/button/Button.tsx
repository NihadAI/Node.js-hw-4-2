function Button({ className, children, onClick, type}: IButton) {
  const style: React.CSSProperties = {
    backgroundColor:"#576BE3", 
    border:"none", 
    padding:"10px 20px", 
    borderRadius:"6px", 
    fontSize:"18px", 
    color:"#EBEFFC", 
    textTransform:"uppercase", 
    transition:"ease 0.3",
  }
  
  return (
    <button className={className} style={style} onClick={onClick} type={type}>{children}</button>
  )
}

export default Button