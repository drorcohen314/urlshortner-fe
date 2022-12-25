import React , {useState}  from "react";
import './App.css';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';

const protocol = "http"
const serverAddress = "127.0.0.1"
const serverPort = "8081"
const serverBaseUrl = protocol+ "://" + serverAddress + ":" + serverPort
const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

function App() {
  let [shortURL, setShortURL] = useState("")
  let [longURL, setLongURL] = useState("")
  let [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append("url",longURL)
    axios.post(serverBaseUrl+"/create-short",params).then(response => {
      console.log(response," response")
      setShortURL(response.data.shortURL);
    });
  }
  const handleClick = (event) => {
    navigator.clipboard.writeText(shortURL)
  }
  return (
    <div className="App" style={{width:'60%', margin:'auto'}}>
      <h1>URL SHORTNER</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter a URL you'd like me to shorten.</Form.Label>
        <Form.Control type="text" placeholder="http(s)://blahblah.com/blahblah" required value={longURL} onChange={(e) => {
          setValidated(urlRegex.test(e.target.value))
          setLongURL(e.target.value)
        }
      }/>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!validated}>
        Submit
      </Button>
      
        {(shortURL !== "") ?
        <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            Click to copy
          </Tooltip>
        }><div id="output" onClick={handleClick}>{shortURL}</div></OverlayTrigger>: null}
      
    </Form>
    </div>
  );
}

export default App;
