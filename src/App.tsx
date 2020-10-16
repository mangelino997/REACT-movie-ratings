import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { MoviesProvider } from './context/MoviesContext';
import { UserProvider } from './context/UserContext';
import IconStars from './icons/stars';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080/v1';
axios.defaults.baseURL = 'https://app-rest-movies-ratings.herokuapp.com/v1';
function App() {

  const [loading, setLoading] = useState({
    value: true
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading({ value: false });
    }, 3000);
  }, [])


  return (
    <>
      {loading.value ? (
        <div className="App bg-color-red">
          <div className="container container-loading">
            <div className="row justify-content-center align-items-center ">
              <div className="col-12 my-auto col-md-12 text-center">
                {/* <img src={MovieGif}></img> */}
                <p className="title-loading-movies text-pop-up-top">MOVIES</p>
                <p className="title-loading-movies text-pop-up-top">RATING</p>
                <div className="text-center">
                  {[...Array(5)].map((star: any, index: number) => {
                    const i = 5 - index;
                    return (
                      <IconStars key={index} className={"roll-in-left-" + i}
                        width={50} height={50}
                        stroke="#FF8222" fill="#FF8222" />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (
          <div className="App">
            <UserProvider>
              <MoviesProvider>
                <NavBar />
              </MoviesProvider>
            </UserProvider>
          </div>)}
    </>
  );
}

export default App;
