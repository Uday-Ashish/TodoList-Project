import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthStyles.css'
import AuthServices from '../../services/AuthServices';
import toast from 'react-hot-toast';

const Register = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username , setUsername] = useState('');

  const navigate = useNavigate("");

  const registerHandler = async (e) =>{
    
    try{
      e.preventDefault();
      // console.log(`Login Data : ${email} , ${password} , ${username}`);

      
      const data = {email,password,username}
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate('/login');
      console.log(res.data);
    }catch (error){
      toast.error(error.message);
      console.log(error);
    }

  }



  return (
    <div className='form-container'>
      <div className='form'>
        <div className='mb-3'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
        <div className='mb-3'>
          <input 
          type='text'
          className='form-control'
          placeholder='enter username'
          onChange={(e) => {setUsername(e.target.value)}}
          />
        </div>
        <div className='mb-3'>
          <input 
          type='email'
          className='form-control'
          placeholder='enter email'
          onChange={ (e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className='mb-3'>
          <input
          type='password'
          className='form-control'
          placeholder='enter password'
          onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div className='form-bottom'>
          <p className='text-center'>
            Already a user ?? please 
            <Link to='/login' > Login  </Link>
          </p>
          <button
          type='submit'
          className='login-btn'
          onClick={registerHandler}
          >Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
