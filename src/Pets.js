import React, { useState, useEffect } from 'react';
import './Pets.css';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const Pets = () => {

    const [dogs, setDogs] = useState([]);

    const [img, setImg] = useState('');

    const openModal = (img) => {
        setImg(img);
    };

    const closeModal = () => {
        setImg('');
    };

    const pets = dogs.map(({id, name, date_admission, image_url, vaccinated, active}) => (
        <div className="pet__item" key={id}>
            <div className="image__wrapper"><img onClick={() => openModal(image_url)} className={active ? 'pet__img active' : 'pet__img'} src={image_url} alt="dog" /></div>
            <p className='pet__name' >{name}<i className={vaccinated ? 'fas fa-syringe vaccinated' : 'fas fa-syringe'}></i></p>
            <p className='pet__date'>Admission: {new Date(date_admission).toLocaleDateString()}</p>
        </div>
    ));

    useEffect(() => {
    setTimeout(() => {   
        fetch('http://localhost:8055/items/dogs')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw Error("Couldn't get data")
        })
        .then(({data}) => {
        setDogs(data);
      })
      .catch(error => console.log(error))
      }, 1500);
      return () => setDogs([]);
  },[]);

    useEffect(() => {
        const pets = document.querySelectorAll('.pet__item');
        if(dogs.length) {
            let time = 100;
            pets.forEach(pet => {  
                setTimeout(() => pet.classList.add('active'), time);
                time += 100;
            });
        };
        return () => {
            if(dogs.lenght) {
                pets.forEach(pet => pet.classList.remove('active'));
            }
        }

    }, [dogs]);


    return ( 
        <div className='pets__wrapper'>
            <Link className='pets__back' to='/'><i className="fas fa-angle-left"></i></Link>
            <h2 className='pets__heading'>Our pets:</h2>
            {dogs.length ? null : <div className="pets__loader"/>} 
            <section className='pets__section'>
                {pets}
            </section>
            {img ? <Modal img={img} handleClose={closeModal} /> : null}
        </div>
     );
}
 
export default Pets;