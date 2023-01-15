import React from 'react'
import "./search.scss"
import { useEffect, useState } from "react";
import axios from "axios";
function Search() {
    const [post, setPost] = useState([]);
    const [filter, setFilter] = useState("")
    const [search, setSearch] = useState([])
    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/products").then((data) => {
            console.log(data);
            setPost(data?.data)
            setSearch(data?.data);
        });
    }, []);
    const hendlefilter = (e) => {
        if (e.target.value === "") {
            setPost(search)
        }
        else {
            const filterResaut = search.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResaut)
        }
        setFilter(e.target.value)
    }
    const filterGrowing = () =>
        setPost([...post].sort((a, b) => (a.unitPrice > b.unitPrice) ? 1 : (b.unitPrice > a.unitPrice) ? -1 : 0))

    const filterDecreasing = () =>
        setPost([...post].sort((a, b) => (a.unitPrice < b.unitPrice) ? 1 : (b.unitPrice < a.unitPrice) ? -1 : 0))
    return (
        <section className="sectionCardSearch">
            <div className="CartSearch_width">
                <h1 className='tittle'>React-Search-Filter-Task</h1>
                <div className='Search_title'>
                    <button onClick={filterGrowing}>Growing</button>
                    <input placeholder='Search' value={filter} onInput={(e) => { hendlefilter(e) }} />
                    <button onClick={filterDecreasing}>Decreasing</button>
                </div>
                <div className="card_total">
                    {
                        post
                            .map((item) => {
                                return (
                                    <div className='card'>
                                        <h1> {item.name}</h1>
                                        <p>Price: {item.unitPrice}</p>
                                        <p>Per unit: {item.quantityPerUnit}</p>
                                        <p>reorder level: {item.reorderLevel}</p>
                                        <button className="btn">basket</button>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </section>
    )
}

export default Search