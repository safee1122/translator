import React, { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText, setTranslatedText } from "./reducer";
import axios from "axios";
import "./translator.css";
import DropDown from "../../components/dropdown";
import _debounce from "lodash/debounce";

const access = "d4e04c28ae447e05b688caa63e08a055dc7b42b0";

function Translator() {
  const statetxt = useSelector((state) => state.translator);
  const dispatch = useDispatch();
  const [word, set] = useState("");
  axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

  function handleDebounceFn(e) {
    dispatch(setText({ text: e }));
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1500), []);
  const handleChange = (e) => {
    debounceFn(e);
  };
  const Body = {
    translationModel: statetxt.model,
    sourceText: statetxt.text,
  };
  async function func() {
    try {
      const result = await axios.post(
        "https://mt-prod.cleverso.com/api/mt/text/",
        Body
      );
      dispatch(
        setTranslatedText({
          translatedtext: result.data.translatedText,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  func();

  console.log(statetxt);
  const handleSelect = () => {
    const selection = window.getSelection();

    const selectedText = selection.toString();
    set(selectedText);
    async function Dictionary() {
      try {
        const result = await axios.post(
          "https://dictionaryapi.com/api/v3/references/spanish/json/test?key=0fdb7527-9507-4ef5-9a76-838beb439dbe",
          {
            mode: "cors",
            header: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    Dictionary();
  };

  return (
    <div>
      <h1>Translate</h1>
      <DropDown />
      <div className="container">
        <div className="box">
          <form>
            <textarea
              id="subject"
              name="subject"
              placeholder="Write something.."
              onChange={(e) => handleChange(e.target.value)}
              onMouseUp={handleSelect}
              onDoubleClick={handleSelect}
            ></textarea>
          </form>
        </div>
        <div className="box box-2">
          <p>{statetxt.translatedtext}</p>
        </div>
      </div>
    </div>
  );
}
export default Translator;
