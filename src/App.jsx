import {useState, useEffect} from 'react';
import Header from "./components/Header";


function App(){
    const [view, setView] = useState('search');
    return(
        <div>
             <Header view={view} setView={setView} />
        </div>
    )
}

export default App;