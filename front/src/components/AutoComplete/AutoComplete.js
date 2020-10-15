import React, {useState} from 'react';

const AutoComplete = (props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const clickSuggestion = (e) => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    if(props.onChange)
      props.onChange(e.currentTarget.innerText);
  }

  const onChange = (e) => {
    const { suggestions } = props;
    setFilteredSuggestions(suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1
    ));
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      if (props.onChange)
        props.onChange(e.currentTarget.innerText);
    }
  };
  
  return (<>
    <div>
      <input type="text"
        className={props.hasError ? "form-control error-style" : "form-control"}
        onChange={onChange}
        value={userInput}/>

      { userInput && showSuggestions ? filteredSuggestions.length > 0 ? (
        <ul className="list-group">
          {
            filteredSuggestions.map((suggestion) => {
              return (
                <li key={suggestion} onClick={clickSuggestion} className="list-group-item">
                  {suggestion}
                </li>
              )
            })
          }
        </ul>
      ) : (
        <div className="no-suggestions">
          <h6>No Suggestions!</h6>
        </div>
      ) : null
      }
    </div>
  </>);
}

export default AutoComplete;
