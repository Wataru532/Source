import { slide as Menu } from 'react-burger-menu'
import './hamburger.css'
import { Link } from 'react-router-dom'
import styles from './hamburger.module.css'

export const GuestHamburger =()=>{
    return(
        <div id="outer-container">
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width={250}>
        <main id="page-wrap">
                <Link to = '/Guest_Home' className={styles.home}>Home</Link>
                <Link to = '/Assignments' className={styles.assignments}>Assignments</Link>
                <Link to = '/Classes' className={styles.classes}>Classes</Link>
                <a href="https://mail.google.com/chat/u/0/#chat/home" class={styles.chats} target="_blank" rel="noopener noreferrer">Chats</a>
                <Link to = '/Guest_Settings' className={styles.settings}>Settings</Link>
                <Link to = '/Login' className={styles.logout}>Login</Link>
        </main>
        </Menu>
  </div>
    )
}