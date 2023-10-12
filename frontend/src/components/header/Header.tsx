import Button from '../UI/button/Button'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
 
  return (
    <header className='header'>
       <div className='header__container'>
        <div className='header__logo' onClick={() => navigate('/')}>DAMN.NEWS</div>
          <Button className='header__create-post hover' onClick={() => navigate('/create')}>Create post</Button>
       </div>
    </header>
  )
}

export default Header