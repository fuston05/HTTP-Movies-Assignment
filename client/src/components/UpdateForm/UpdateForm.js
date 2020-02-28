import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

//styles
import './UpdateForm.scss';

const UpdateForm = ({getMovieList, movieList, setMovieList}) => {
  const [movieToEdit, setMovieToEdit] = useState({});
  const {id} = useParams();
  let history= useHistory();

  useEffect(() => {
      const itemToEdit= movieList.find( movie => `${movie.id}` === id );
      if(itemToEdit){
        setMovieToEdit(itemToEdit);
      }//end if
  }, [])

  const handleChange = e => {
    let value= e.target.value;
    setMovieToEdit({
      ...movieToEdit,
      [e.target.name]: value
    });
    console.log('handleChange: ');
  }//end handleChange

  const sendPut= () => {
    axios.put(`http://localhost:5000/api/movies/${movieToEdit.id}`, movieToEdit)
    .then(putRes => {
      console.log('putRes.data: ', putRes.data);
      getMovieList();
      history.push(`/movies/${id}`);
    })
    .catch(putErr => {console.log('putErr: ', putErr)})
  }//end sendPut

  const handleSubmit = e => {
    e.preventDefault();
    sendPut();
    {console.log('movieToEdit from state: ', movieToEdit)}
    console.log('submitted!');
  }//end handleSubmit

  return (
    <div className='updateCont'>
      {console.log('movieList from props: ', movieList)}
      <form onSubmit={handleSubmit}>

        <label htmlFor='title'>Title</label>
        <input
          onChange={handleChange}
          value={movieToEdit.title}
          type='text'
          name='title'
          id='title'
          placeholder='Title'
        />

        <label htmlFor='director'>Director</label>
        <input
          onChange={handleChange}
          value={movieToEdit.director}
          type='text'
          name='director'
          id='director'
          placeholder='Director'
        />

        <label htmlFor='metascore'>Metascore</label>
        <input
          onChange={handleChange}
          value={movieToEdit.metascore}
          type='text'
          name='metascore'
          id='metascore'
          placeholder='Metascore'
        />

        <label htmlFor='actors'>Stars</label>
        <input
          onChange={handleChange}
          value={movieToEdit.stars}
          type='text'
          name='stars'
          id='stars'
          placeholder='Stars'
        />

        <button
          id='updateSubmitBtn'
        >Submit Changes</button>
      </form>
    </div>
  )
}

export default UpdateForm;