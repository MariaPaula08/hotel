import { useAuth } from '../../context/AuthContext'
import './stylesNav.css'

import Admin from './NavBars/Admin'
// import Aprendiz from './NavBars/Aprendiz'


function NavBar() {
    const { user } = useAuth()
    const rol = user.rol

    return (
        <>
            <Admin user={user} />
        </>
    )
}

export default NavBar