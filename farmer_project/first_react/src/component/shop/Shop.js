import React, { useState, useEffect } from 'react';
import Card from './Card';


function Shop() {
  let [user, setUser] = useState([]);
  let [filteredItem, setFilter] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/organicfarm/products')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleInput(e) {
    let searchTerm = e.target.value;
    let filteredItems = user.filter((item) => item.productName.includes(searchTerm));
    setFilter(filteredItems);
    console.log(filteredItems);
  }

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <div className='w-50 text-center d-block mx-auto m-5'>
        <input
          type="text"
          id="search"
          className='w-75'
          placeholder="search by title"
          onChange={handleInput}
        />
        <label id="search">
          <img
            src="https://media.istockphoto.com/id/924437708/vector/magnifying-glass-icon.jpg?s=612x612&w=0&k=20&c=VXDoaQ6Ns61N2v6CsMXX-vYlG5oUY3ufoUncvUp1zNY="
            alt=""
            width="60"
            height="60"
          />
        </label>
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
