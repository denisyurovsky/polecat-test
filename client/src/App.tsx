import "destyle.css";
import React, {useEffect, useState} from "react";
import './index.css'

const App: React.FC = () => {

    const [ratNames, setRatNames] = useState([])
    const [ratInfo, setRatInfo] = useState<any>('')
    const [name, setName] = useState('')

    useEffect(() => {
        fetch('http://localhost:7421/rat-names')
            .then(data => data.json())
            .then(data => setRatNames(data))
    }, [])

    useEffect(() => {
        if (name) {
            fetch(`http://localhost:7421/rat/${name}`)
                .then(data => data.json())
                .then(data => setRatInfo(data))
        } else {
            setRatInfo('')
        }
    }, [name])

    return <div className='wrapper'>
        <span>Choose rat</span>
        <select onChange={(e) => setName(e.target.value)}>
            <option value=''>
                No Rat
            </option>
            {ratNames.map((name) => {
                return <option key={name}>
                    {name}
                </option>
            })}
        </select>
        { ratInfo &&
            <div className='ratInfo'>
            <span>width: {ratInfo.width || ''}</span>
            <span>height: {ratInfo.height || ''}</span>
            <span>nickname: {ratInfo.nickname || 'Uncool Rat with no Nickname'}</span>
        </div>
        }
    </div>;
};

export default App;
