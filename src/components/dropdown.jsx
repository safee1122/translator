import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setModel } from "../features/translator/reducer";
import { useDispatch } from "react-redux";
import "./dropdown.css";

function DropDown() {
  const [age, setAge] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAge(event.target.value);
    dispatch(setModel({ model: event.target.value }));
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"en-ar"}>eng-arb</MenuItem>
          <MenuItem value={"ar-en"}>arb-en</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDown;
