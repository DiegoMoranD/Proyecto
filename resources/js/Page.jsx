import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import  ReactDOM  from 'react-dom/client'

function PageMain() {
  return (
    <BrowserRouter>
      fsaddsa
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('ReactMain')).render(<PageMain/>);

// if(document.getElementById('ReactMain')){
//     createRoot(document.getElementById('ReactMain')).render(<PageMain/>);
// }