import React, { useState, useEffect } from 'react';
import Card from './Card'
import './shop.css'

function Shop() {
  let [user, setUser] = useState([]);
  let [filteredItem, setFilter] = useState([]);
  const [selected, setSelected] = useState('');

  
  useEffect(() => {
    fetch('http://localhost:3030/organicfarm/products')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        // console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleInput(e) {
    
    let searchTerm = e.target.value;
    searchTerm=searchTerm.toLowerCase()
    let filteredItems = user.filter((item) => item.productName.toLowerCase().includes(searchTerm));
    console.log(filteredItems)
    setFilter(filteredItems);
    //console.log(filteredItems);
  }
  function handleInputCatgeory(e) {
    setSelected(e.target.value);
    let searchTerm = e.target.value;
   
    let filteredItems = user.filter((item) => item.category==searchTerm);
    setFilter(filteredItems);
    //console.log(filteredItems);
  }

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <div className='w-100 text-center d-flex ' style={{alignItems:'center',justifyContent:'center'}}>
      <div className='searchBox m-2 p-1'>
        <input
          type="text"
          id="search"
          className=''
          placeholder="search"
          onChange={handleInput}
          style={{margin:'8px'}}
          
        />
        <label id="search">
          <img
            src="https://media.istockphoto.com/id/924437708/vector/magnifying-glass-icon.jpg?s=612x612&w=0&k=20&c=VXDoaQ6Ns61N2v6CsMXX-vYlG5oUY3ufoUncvUp1zNY="
            alt=""
            width="40px"
            height="40px"
            style={{margin:'0px', borderRadius:'50px'}}
          />
        </label>
        </div>
        <div className='h-100 m-2 p-1'>
        <select id="Category" className='h-100 p-1 m-1' value={selected}  onChange={handleInputCatgeory}>
        <option value="" className='h-100' >Select</option>
        <option value="Fruits" className='h-100'>Fruits</option>
        <option value="Vegetables">Vegetables</option>
       
       
      </select>
      </div>
      <div>

      </div>
      </div>
    
        <div className='row g-3 m-3 p-3'>
          {filteredItem.length === 0 ? user.map((userObj) => (
            <Card key={userObj._id} data={userObj} />
          )) : filteredItem.map((userObj) => (
            <Card key={userObj._id} data={userObj} />
          ))}
        </div>
      
     
    </div>
  );
}

export default Shop;
