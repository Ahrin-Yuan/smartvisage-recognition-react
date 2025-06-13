import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return(
        <div> 
            <p className='f4 white'>
                {'This Smart Brain will detect faces in your Pictures! Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3'>
                <input className='input-field f4 pa2 w-70 center'
                    placeholder="add your image url" 
                    type='text' 
                    onChange={onInputChange}/>
                <button 
                    className='btnDetect w-30 f4 link ph3 pv2 dib'
                    onClick={onPictureSubmit}
                    >Detect
                </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;