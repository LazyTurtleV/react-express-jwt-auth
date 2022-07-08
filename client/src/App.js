import React, { useEffect } from "react";


function App() {
  useEffect(async () => {
    const r = await fetch('http://localhost:5000/api/login', {
      email: 'valerapupkin89s@gmail.com',
      password: 'qwerty123'
    }).then((r) => r.json());
    console.log('RESPONSE GOTTEN', r);
  },[]);

  return (
    <div />
  );
}

export default App;
