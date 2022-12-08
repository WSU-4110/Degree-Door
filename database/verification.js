import auth from './firebase';
import './' ;
import {useState} from 'react';

function verification() 
{
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const signup = ()=>{
        auth.createUserWithEmailAndPassword(email , password)
        .then((userCredential)=>{
            // send verification mail.
          userCredential.user.sendEmailVerification();
          auth.signOut();
          alert("Email sent");
        })
        .catch(alert);
    }

}