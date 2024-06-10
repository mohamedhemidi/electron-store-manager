import { useState } from 'react';
import './App.css'

function App() {
  const [name, setName]= useState("");
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) : void => {
    setName(e.target.value);
  }
  const handleSubmit = () : void => {
    console.log(name);
  }

  return (
    <>
      <h1>Electron From React Vite</h1>
      <input value={name} onChange={handleChange} type='text' name='name'/>
      <button onClick={handleSubmit}>Create Client</button>
    </>
  )
}

export default App
