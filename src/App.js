import './App.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import axios from "axios";

function BasicExample() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  //const [allEntry,setallEntry]=useState([])
  const [logindatalist ,setlogindatalist]=useState([]);
  const [output,setoutput]=useState();
  
  const submitForm=(e)=>{

    e.preventDefault();
  
    const buttonName = e.nativeEvent.submitter.name;
  //  const newEntry ={email:email , password:password};
        
    if (buttonName === "login") 
           {  console.log("login"); 
            //?login=mikhan79@gmail.com&password=leopard3261
            axios.get("http://localhost:8000/api/logins/?login="+email+"&password="+password).then(function (response) {     
            
            if(  response.data.length !=0  )
              {  setoutput(`login , password correct`) //Main code line all down code lines are practice lines
                
              
                setlogindatalist( response.data);
                
                // const searchObject= logindatalist.find((person) => person.login===email );
                // if (searchObject.password==password)
                //   {console.log("worked ")
                //  // setoutput(`Password matched`)
                //   console.log(`Password matched ${searchObject.password}`);
                //   }
                // else{
                //   console.log("worked 2")
                //   //  setoutput(`Password not matched`)
                //     console.log(`Password not matched ${searchObject.password}`);
                //     }
              }
            else
            {
              setoutput(`login or password incorrect`)
              console.log("login or password incorrect")
            }
            
            }).catch((err) => console.log(err));

          //  setallEntry([...allEntry,newEntry]);
          //  console.log(allEntry);
            
          }
        if (buttonName === "register") 
            {
                console.log("register");
                //const createLogin = () => {
                const login = { login:email , password: password };
                           
                axios.get("http://localhost:8000/api/logins/?login="+email).then(function (response) 
                {     
            
                  if(  response.data.length !=0  )
                    {  setoutput(`login name already exists`) //Main code line all down code lines are practice lines
                
                    }
                  else
                  {
                    setlogindatalist( response.data);
                    axios.post("http://localhost:8000/api/logins/", login)
                    .then((res) => (console.log(res) , setoutput('Registration Sucessful')  )).catch((err) => 
                    {console.log(err) ; setoutput('Registration not sucessful')}    );
                  }
                }  )
            }
            
            if(buttonName === "delete") 
            {

                console.log("delete");
                //const createLogin = () => {
             //   const login = { login:email , password: password };
                axios.get("http://localhost:8000/api/logins/?login="+email).then(function (response) {     
                  if(  response.data.length !=0  )
                  {  
                    setlogindatalist( response.data);
                    // let index = logindatalist.find(email);
                   // const searchObject=logindatalist.find((person) => person.login===email );
                 //   logindatalist[0].id
                  console.log('wait') 
                  console.log(logindatalist[0].id)
                
                axios.delete(`http://localhost:8000/api/logins/${logindatalist[0].id}/`) 
               //axios.post("http://localhost:8000/api/logins/", login)
               .then((res) => (console.log(res) , setoutput('delete sucessful')      ));
                
                  }
                else{setoutput('log in does not exist')}
              }).catch((err) => {console.log(err) ; setoutput('delete not sucessful')}    );
                
            }

        }

  return (
    <>
    <Form action=""  onSubmit={submitForm}       >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" autoComplete="off" value={email} onChange={(e)=>{setEmail(e.target.value)  }}    />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" autoComplete="off" value={password} onChange={(e)=>{setPassword(e.target.value)  }}   />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button className='me-5'  variant="primary" type="submit" name='login' value='login'   >
        Login
      </Button>
      <Button className='me-5' variant="primary" type="submit" name='register' value='register'   >
        Register
      </Button>
      <Button className='me-5' variant="primary" type="submit" name='delete' value='delete'   >
        Delete
      </Button>
      {/* <button type="Submit" name="login" value="login" >Login</button>
<button type="submit" name="register" value="register">Register</button>
<button type="submit" name="delete" value="delete">Delete</button>
     */}
    
    </Form>
    <div>
    {  
       (output)
    }
    
</div>

    </>
  );
}

export default BasicExample;