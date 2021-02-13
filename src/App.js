import {useEffect, useState} from 'react';
import carIcon from './car.svg';
import './App.css';

const getCarList = async () => {
  try {
    const response = await fetch("/vehicle", {
      method: "get",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
const bookCar = async body => {
  try {
    const response = await fetch("/request", {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(body)
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

function App() {
  const[carClicked,setClick]=useState(false);
  const[carList,setCarList]=useState([]);
  const[clickedCar,setClickedCar]=useState({});
  const[months,setMonths]=useState(1);
  let formData={
    name: "",
    email: "",
    mobile: "",
    vehicle: clickedCar
  }
  useEffect(()=>{
    if(carList.length<=0){
      let serviceCall=getCarList();
      serviceCall.then(data=>{setCarList(data)})
    }    
  })
  
  const onClickCar=(card)=>{
    setClickedCar(card)
    formData.vehicle=card;
    setClick(true)
    console.log(" car Clicked: "+ card.id)
  }
const formSubmit=()=>{
  bookCar(formData).then((data)=>alert(data.message))
}
const formDataAdd=(name, value)=>{
  formData[name]=value;
}

  return (
    
    <div className="body">
        <h1 className="heading">Online Car Rental Service</h1>
        <div className="container">
          {carList.map(card=>(
            <div key={"car_"+card.id}  data-testid={"car_"+card.id} className="card" onClick={()=>onClickCar(card)}>
              <img src={carIcon} alt='car'></img>
              <h2>{card.name}</h2>
              <p>{card.price+' Lakh (Estimated price'}</p>
              <h2 className="rental-price ">{card.rental_price+" INR/Month"}</h2>
              <p className="vehicle-type">{card.type}</p>            
            </div>
          ))}
        </div>
        {carClicked && <div className="request-form">
        <div className='content'>
          <h1>Booknow</h1>
          <hr/>
          <label>Model</label>
          <h2 className="model-name">{clickedCar.name}</h2>
          <label>Duration</label>
          <p><input data-testid="duration_1" type="radio" defaultChecked onClick={()=>setMonths(1)} name="months" value="1"/>1 month</p>
          <p><input data-testid="duration_3" type="radio" onClick={()=>setMonths(3)} name="months" value='3'/>3 month</p>
          <p><input data-testid="duration_6" type="radio" onClick={()=>setMonths(6)} name="months" value='6'/>6 month</p>
          <p><input data-testid="duration_12" type="radio" onClick={()=>setMonths(12)} name="months" value="1"/>1 year</p>
          <p>Rental Price: {clickedCar.rental_price+" /month"}</p>
          <h2 className="amount-payable">{`Payable Amount : ₹ ${clickedCar.rental_price*months}`}</h2>
          <hr/>
          <h2>Your Details</h2>
          <label htmlFor='name'>Full Name</label>
          <input data-testid='name' type="text" onChange={(event)=>formDataAdd("name",event.target.value)}></input>
          <label htmlFor='email'>Email</label>
          <input data-testid='email' type="text" onChange={(event)=>formDataAdd("email",event.target.value)}></input>
          <label htmlFor='mobile'>Mobile</label>
          <input data-testid='mobile' type="text" onChange={(event)=>formDataAdd("mobile",event.target.value)}></input>
          <div className="frm-action-btn">
            <button data-testid="submitbtn" name="Submit" onClick={formSubmit}>Submit</button>
            <button data-testid="cancelbtn" name="cancel" onClick={()=>setClick(false)}>cencel</button>
          </div>
          </div>
          </div>
          }
    </div>    
  );
}

export default App;
