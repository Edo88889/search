import {Url} from "../../Utils/Constants";
import React, {useEffect, useState} from "react";
import Map from "./Map";
import Search from "../Search/Search";
import './stayle.css'

function Index() {
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(0)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)

    const gettingData = async () => {
        try {
            const response = await fetch(`${Url}?query=${search}&page=${counter}`)
            const result = await response.json()
            setData(result.hits)
            setPage(result.nbPages)
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        gettingData()
    }, [counter, search])

    const handleDelete = (del) => {
        setData(data.filter(({objectId}) => objectId !== del))
    }
    const gettingMinus = () => {
        if (!counter) {
            setCounter(page - 1)
        }
    }
    const gettingPlus = () => {
        if (counter === page - 1) {
            setCounter(0)
        }
    }
    return (
        <>
            <Search/>
            <div className='container-inp'>
                <input className='inp'
                       type='text'
                       placeholder='React'
                       value={search}
                       onChange={(e) => {
                           setSearch(e.target.value)
                           setPage(counter)
                       }}/>
            </div>
            <button className='btn' onClick={() => {
                setCounter(counter - 1)
                gettingMinus(counter)
            }}>prev
            </button>
            <span className='result-btn'>{counter} of {page}</span>
            <button className='btn' onClick={() => {

                setCounter(counter + 1)
                gettingPlus(counter)
            }}>next
            </button>
            <Map nbPages={data.nbPages} data={data} counter={counter} hanвleDelete={handleDelete}/>
        </>
    )
}

export default Index;