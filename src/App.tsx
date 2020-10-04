import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import IconStars from './icons/stars';

// import MovieGif from './assets/371.gif'
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
                <p className="title-loading-movies text-pop-up-top">RANKING</p>
                <div className="text-center">
                  <IconStars className="roll-in-left-5" 
                  width={50} height={50} 
                  stroke="#FF8222" fill="#FF8222"/>
                  <IconStars className="roll-in-left-4" 
                  width={50} height={50} 
                  stroke="#FF8222" fill="#FF8222"/>
                  <IconStars className="roll-in-left-3" 
                  width={50} height={50} 
                  stroke="#FF8222" fill="#FF8222"/>
                  <IconStars className="roll-in-left-2" 
                  width={50} height={50} 
                  stroke="#FF8222" fill="#FF8222"/>
                  <IconStars className="roll-in-left-1" 
                  width={50} height={50} 
                  stroke="#FF8222" fill="#FF8222"/>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (
          <div className="App">
            <NavBar />
          </div>)}
    </>
  );
}

export default App;
