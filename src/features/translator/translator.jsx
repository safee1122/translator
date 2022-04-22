import React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText, setTranslatedText } from "./reducer";
import axios from "axios";
import "./translator.css";
import DropDown from "../../components/dropdown";
import _debounce from "lodash/debounce";
const access = "d4e04c28ae447e05b688caa63e08a055dc7b42b0";
// const auth = axios.create({
//   baseURL: "https://mt-prod.cleverso.com/api/mt/text/",
//   headers: {
//     Authorization: `Bearer ${access}`,
//   },
// });
// axios.defaults.baseURL = "https://mt-prod.cleverso.com/api/mt/text/";

function Translator() {
  const statetxt = useSelector((state) => state.translator);
  const dispatch = useDispatch();
  axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

  function handleDebounceFn(e) {
    dispatch(setText({ text: e }));
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1500), []);
  const handleChange = (e) => {
    debounceFn(e);
  };
  const Body = {
    translationModel: setText.model,
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
  dispatch(() => {
    func();
  });
  console.log(statetxt);

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
            ></textarea>
          </form>
        </div>
        <div className="box">
          <textarea readOnly={true}></textarea>
        </div>
      </div>
    </div>
  );
}
export default Translator;
