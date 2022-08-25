import {Link} from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext';
import { styles } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {state, dispatch} = useThemeContext();
    const [actualStyle, setActualStyle] = useState("dark");
    const {logout} = useLogout();
    const {user} = useAuthContext();

    useEffect(() => {
        setActualStyle(state.theme);
    }, [state])

    const changeTheme = (style) => {
        dispatch({type: style})
    }

    return ( 
        <nav>
            <div className="navContainer">
                <div id="logo"><Link to="/"><h1>Improvement</h1></Link></div>
                { user && 
                (
                    <>
                
                        <div id="navMain">

                                <ul>
                                    <Link to="/"><li className="navActive">home</li></Link>
                                    <Link to="#"><li>spolecznosc</li></Link>
                                    <Link to="#"><li>friends</li></Link>
                                    <Link to="/blogs"><li>blog</li></Link>
                                    <li><button className='button' onClick={logout}>Logout</button></li>
                                </ul>
                            </div>

                            <div id="navRight">
                                <ul>
                                    <div className='dropdown'>
                                        <li>style</li>
                                        <ul className='dropdown-menu'>
                                            <li className="light" onMouseEnter={() => changeTheme(styles.TRY_LIGHT)} onMouseLeave={() => changeTheme(`try${actualStyle}`)} onClick={() => {changeTheme(styles.SET_LIGHT)}}>light</li>
                                            <li className="dark" onMouseEnter={() => changeTheme(styles.TRY_DARK)}  onMouseLeave={() => changeTheme(`try${actualStyle}`)} onClick={() => {changeTheme(styles.SET_DARK)}}>dark</li>
                                            <li className="colorful" onMouseEnter={() => changeTheme(styles.TRY_COLORFUL)} onMouseLeave={() => changeTheme(`try${actualStyle}`)} onClick={() => {changeTheme(styles.SET_COLORFUL)}}>colorful</li>
                                        </ul>
                                    </div>
                                    <Link to="#"><li>chat</li></Link>
                                    <Link to="#"><li>powiadomienia</li></Link>
                                    <Link to="#"><li>konto</li></Link>
                                </ul>
                        </div>
                    </>
                )}
                { !user && 
                (
                <>
                    <div id="navRight">
                        <ul>
                            <Link to="/login"><li className="navActive">login</li></Link>
                            <Link to="/signup"><li>signup</li></Link>
                        </ul>
                    </div>
                </>)}
            </div>
        </nav>
     );
}
 
export default Navbar;