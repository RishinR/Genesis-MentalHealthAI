import './Timermain.css';
import Timer from "./Timer";
import Settings from "./Settings";
import {useState} from "react";
import SettingsContext from "./SettingsContext";

function Timermain() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className = 'main1'>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
}

export default Timermain;
