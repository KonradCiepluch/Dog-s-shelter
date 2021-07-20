import React from 'react';
import './Modal.css';

const Modal = ({img, handleClose, children}) => {

    return ( 
        <div className="modal">
            <div className='modal__wrapper'>
                <img className='modal__image' src={img} alt="dog" />
                <button className='modal__btn' onClick={handleClose} ><i className="fas fa-times-circle"></i></button>
                {children}
            </div>
        </div>
     );
}
 
export default Modal;