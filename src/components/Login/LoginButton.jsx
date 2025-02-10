import { signInWithPopup,signOut } from "firebase/auth";
import styles from './Login.module.css'
import { auth,provider } from '../Auth/Auth'
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert2';

function LoginButton(){
    const navigate = useNavigate()
    const signInWithGoogle = () =>{
      signInWithPopup(auth,provider)
      .then((result) => {
          const user = result.user
          const email = user.email
          const emailDomain = email.split('@')[1];
          if (emailDomain === "yamagatahigashi.jp" ){
            navigate('/')
          } else {
            const logout = () =>  {
              signOut(auth)
              .then(() => {
              })
              .catch((err) => {
                console.log(err.message);
              });
            
              swal.fire({
                title:'Error',
                text:'Your Google Account is not supported',
                icon:'error'
              
              })            
  
              }
              logout()
            };
            
          })
        
    }
    return (
      <div>
        <button className={styles.buttonOutline} onClick={signInWithGoogle}>
          <p>Signin With Google</p> 
        </button>
      </div>
    )
  }

export {LoginButton}