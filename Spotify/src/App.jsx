import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <>
      <Route path="/login" element={<Login />} />
      {/*setIsLoggedIn={setIsLoggedIn}*/}
      <Route
        path="/signup"
        element={<Signup setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/admin/*" element={<Admin />} />
      {!isAuthenticationPage && (
        <Route
          path="*"
          element={
            <div className="h-screen bg-black flex ">
              <Sidebar /> {/* isLoggedIn={isLoggedIn} */}
              <Home />
              {/*isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} */}
            </div>
          }
        />
      )}
      <div className="h-screen bg-black">
        {songsData.length !== 0 ? (
          <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        ) : null}

        <audio
          ref={audioRef}
          preload="auto"
          src={track ? track.file : ""}></audio>
      </div>
    </>
  );
};

export default App;
