import React, {useState, useEffect} from 'react';
import axios from 'axios';

const intialItem = {
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(intialItem);
    const id = props.match.params.id;
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res=>{
                setMovie(res.data)
                console.log()
            })
    },[])
    
    const changeHandler = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        })
        if(e.target.name === 'stars'){
            setMovie({
                ...movie,
                [e.target.name] : e.target.value.split(',')
            })
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res=>{
            console.log(res)
            props.history.push(`/movies/${id}`);
        })
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h3>Title</h3>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title}/>
            <h3>Director</h3>
            <input type="text" name="director" onChange={changeHandler} placeholder="director" value={movie.director}/>
            <h3>MetaScore</h3>
            <input type="number" name="metascore" onChange={changeHandler} placeholder="metascore" value={movie.metascore}/>
            <h3>Actors</h3>
            <textarea className='textarea'type='text' name='stars' onChange={changeHandler} placeholder='stars' value={movie.stars}/>
            <button className='submit-button' type='submit'>Submit</button>
        </form>
    )
}

export default UpdateMovie;