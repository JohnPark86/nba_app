import React, { useState , useEffect} from 'react';
import Select from "react-select";
import {} from "../../scss/bootstrap-overrides.scss";
import NBA from "nba";

var logo = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "8%"
};

const Input = ({handleChange}) => {
    
    const [playerObj, setPlayerObj] = useState(null);
    const [player, setPlayer] = useState('');
    const [options, setOptions] = useState([]);

    const handleSelect = (value) => {
        setPlayerObj(value)
        setPlayer(value.fullName)
            
        if (handleChange) {
            handleChange(value.fullName);
        }        
    }

    useEffect(() => {
        setOptions(NBA.players);
    },[]);

    return (
        <div className="input-area">
            <img style={logo} src={require("../../img/logo.png")} />
            <Select
                id="input_select"
                getOptionLabel={(option: {}) => option.fullName}
                options={options}
                value={playerObj}
                onChange={handleSelect}
                placeholder="Select an NBA player"
            />
        </div>
    );
}

export default Input;

