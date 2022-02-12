import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { geolocated } from "react-geolocated";
import { useAuth } from "../libs/auth";
import { editLocation } from '../libs/database';
import { useState } from 'react';


const Home = (props) => {
  const auth = useAuth();
  const [notify, setNotify] = useState(false);

  return !props.isGeolocationEnabled ? (
    <div className={styles.container}>
      <Head>
        <title>GeoFence</title>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          Aniket Geofencing 
        </div>       
      </nav>

      <main className={styles.mainScreen}>
      
        <h1 className={styles.title}>
          <b>GeoFencing </b>
        </h1>

        <p className={styles.description}>Welcome to the App. We will access your current location and then we will store your details and current location to monitor 
        your location</p>

        <p className={styles.description, styles.redText}>
          Please allow location access to continue
        </p>
      </main>


    </div>
  ) :
  (
    <div className={styles.container}>
      <Head>
        <title>GeoFencing</title>
      </Head>

      <nav className={styles.nav}>
        <div className={styles.brand}>
          Aniket Geofencing 
        </div>       
      </nav>
      {/* {  !auth.user &&
          <h2 style="text-align:center;">Please Sign in Using any of the following</h2>
        } */}
      <main className={styles.main}>
      
        

    <div className={styles.card}>
           <h1>Your Current Location</h1>
           <table>
                <tbody>
                    <tr>
                        <td>Current latitude</td>
                        <td>{props.coords?.latitude}</td>
                    </tr>
                    <tr>
                        <td>Current longitude</td>
                        <td>{props.coords?.longitude}</td>
                    </tr>
                </tbody>
            </table>
            
              </div>
  { !auth.user ?
              <div className={styles.card}>
                     <h1>Sign In Options</h1>
                           <div className={styles.row}>

                     <div className={styles.col}>
     
        {
          !auth.user &&
        <button onClick={(e) => auth.signinwithGoogle()}>Sign In using Google</button>
        }
        
        </div>

        { /* Facebook Sign-in */}
        <div className={styles.col}>
        {
          !auth.user &&
          <>
        
        <button onClick={(e) => auth.signinwithFacebook()}>Sign In with Facebook</button>
        </>
        }
        </div>

        { /* Github Sign-in */}
        <div className={styles.col}>
        {
          !auth.user &&
        <button onClick={(e) => auth.signinwithGithub()}>Sign In using Github</button>
        }
        </div>
        </div>
</div> :  <>
       <div className={styles.card}>
        <div className='avatar-wrapper' style={{background:`url("${auth.user.photoUrl}")`}}>

        </div>
          <p className='user-info'>
           You are right now signed in as {auth.user.email}
          </p>
          
          <button className='save-btn' onClick={e=>{
            editLocation(auth.user.uid, props.coords?.latitude, props.coords?.longitude )
            setNotify(true);
            }}>Save Location</button>
         <div className={styles.successText}>   {notify && <span className='success-text'>
           Your current location has been stored</span>}</div>
           <button onClick={(e) => auth.signout()}>Sign Out</button>
          </div>
          
        
       </>
          }

       { /* Google Sign-in */}
       
        
          {/* {auth.user && 
        <>
        <div className='avatar-wrapper' style={{background:`url("${auth.user.photoUrl}")`}}>

        </div>
          <p className='user-info'>
           You are right now signed in as {auth.user.email}
          </p>
          
          <button className='save-btn' onClick={e=>{
            editLocation(auth.user.uid, props.coords?.latitude, props.coords?.longitude )
            setNotify(true);
            }}>Save Location</button>
            {notify && <span className='success-text'>
           Your current location has been stored</span>}
          </>
          } */}
          
        
            
      
      </main>

    </div>
  )
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 100000,
})(Home);