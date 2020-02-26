import React, {useState} from 'react';

//styles
import './UpdateForm.scss';

const UpdateForm = () => {
  const [updateValue, setUpdateValue]= useState({
    title: '',
    director: '',
    metascore: '',
    actors: []
  });

  const handleChange= e => {
    setUpdateValue({
      ...updateValue,
      [e.target.name]: e.target.value
    });
    console.log('handleChange: ');
  }//end handleChange

  const handleSubmit= e => {
    e.preventDefault();
    console.log('submitted!');
  }//end handleSubmit

  return (
    <div className= 'updateCont'>
      {console.log('updateValue from state: ', updateValue)}
      <form onSubmit= {handleSubmit}>

        <label htmlFor= 'title'>Title</label>
          <input 
            onChange= {handleChange}
            value= {updateValue.title}
            type= 'text'
            name= 'title'
            id= 'title'
            placeholder= 'Title'
        />

        <label htmlFor= 'director'>Director</label>
          <input 
            onChange= {handleChange}
            value= {updateValue.director}
            type= 'text'
            name= 'director'
            id= 'director'
            placeholder= 'Director'
        />

        <label htmlFor= 'metascore'>Metascore</label>
          <input 
            onChange= {handleChange}
            value= {updateValue.metascore}
            type= 'text'
            name= 'metascore'
            id= 'metascore'
            placeholder= 'Metascore'
        />

        <label htmlFor= 'actors'>Actors</label>
          <input 
            onChange= {handleChange}
            value= {updateValue.actors}
            type= 'text'
            name= 'actors'
            id= 'actors'
            placeholder= 'Actors'
        />

          <button 
            id= 'updateSubmitBtn'
          >Submit Changes</button>
      </form>      
    </div>
  )
}

export default UpdateForm;