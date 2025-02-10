import { Link,useLocation,useNavigate } from 'react-router-dom'
import styles from './guest_header.module.css'
import logo from '../../../images/logo.png'
import { GuestHamburger } from './hamburger/Guesthamburger';

export const isSmartPhone=()=> {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    } else {
      return false;
    }
  }

export const GuestHeaderTop= () =>{
    const pathname = useLocation().pathname;
    const navigate = useNavigate()

    const now = pathname.replace('/','')
    if (isSmartPhone()){
        return(
            <div className={styles.body}>
            <div className={styles.flex}>
                <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Guest_Home')}}/>
                <div className={styles.Stitle}>
                <p className={styles.Stitle}>{now} </p>
                </div>
            </div>
            </div>
        )
    }else{

        return(
            <div className={styles.body}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Guest_Home')}}/>
                    <div className={styles.title}>
                    <p className={styles.title}>Scheduler - {now}</p>
                    </div>
                </div>
        </div>
    )
}
}

export const GuestHeader = () => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname;
    const now = pathname.replace('/','')
    //リロード対策

        if (isSmartPhone()){
            return(
            <div className={styles.body}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Slogo} alt='' onClick={() =>{navigate('/Guest_Home')}}/>
                    <div className={styles.Stitle}>
                    <p className={styles.Stitle}>{now}</p>
                    </div>
                </div>
                <GuestHamburger />
            </div>
        )
    }else{
        return(

            <div className={styles.body}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Guest_Home')}}/>
                    <div className={styles.title}>
                        <p className={styles.title}>Scheduler - {now}</p>
                    </div>
                </div>

                <div align="right">
                    <Link to ='/Login' className={styles.logout}>Login</Link>
                </div>
                <div align="left">
                    <Link to = '/Guest_Home' className={styles.home}>Home</Link>
                    <Link to = '/Assignments' className={styles.assignments}>Assignments</Link>
                    <Link to = '/Classes' className={styles.classes}>Classes</Link>
                    <a href="https://mail.google.com/chat/u/0/#chat/home" class={styles.chats} target="_blank" rel="noopener noreferrer">Chats</a>
                    <Link to = '/Guest_Settings' className={styles.settings}>Settings</Link>
                </div>
            </div>
        )
    }
   
}