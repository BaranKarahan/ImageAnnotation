import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import UploadImage from './UploadImage'
import Annotate from './Annotate';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<UploadImage/>}/>
      <Route exact path='/annotate/:encUrl/:encName' element={<Annotate/>}/>
    </Routes>
  );
}

export default Main;