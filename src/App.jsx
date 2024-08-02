import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const API = 'https://random-data-api.com/api/v2/users?size=20&is_xml=false';
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="app">
        <input
          type="text"
          placeholder="search"
          onChange={handleSearch}
          value={search}
        />
        <div className="cards">
          {users
            .filter((val) => {
              if (search == '') {
                return val;
              } else if (
                val.first_name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                val.last_name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((val, idx) => {
              return (
                <div className="card">
                  <img src={val.avatar} alt="" />
                  <h1>{val.username}</h1>
                  <h3>
                    {val.first_name} {val.last_name}
                  </h3>
                  <p> Gender :{val.gender}</p>
                  <p>Phone No : {val.phone_number}</p>
                  <p>Email : {val.email}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
