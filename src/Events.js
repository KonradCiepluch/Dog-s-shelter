import React, {useEffect, useState} from 'react';
import './Events.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Events = () => {

    const [events, setEvents] = useState([]);

    const [img, setImg] = useState('');

    const [index, setIndex] = useState(0);

    const handleClick = (photo, index) => {
        setImg(photo);
        setIndex(index);
    }

    const closeModal = () => {
        setImg('');
        setIndex(0);
    }

    const changePhoto = (type) => {
        const { photos } = events[index];
        const number = photos.findIndex(item => item === img);
        if(type === 'next'){
            let nextImg 
            number === photos.length -1 ? nextImg = 0 : nextImg = number + 1;
            setImg(photos[nextImg]);
        } else {
            let prevImg 
            number === 0 ? prevImg = photos.length -1 : prevImg = number -1;
            setImg(photos[prevImg]);
        }
    }
 
    const data = events.map(({title, id, date, photos}, index) => (
        <article className="event" key={id}>
            <h3 className='event__heading'>{title}</h3>
            <p className='event__date'>{new Date(date).toLocaleDateString()}</p>
            {<section className='event__images'>
                {photos.map(photo => <img key={photo} onClick={() => handleClick(photo, index)} src={photo} className='event__image' alt="event" /> )}
            </section> }
        </article>
    ))

    useEffect(() => {
        setTimeout(() => {
         fetch('http://localhost:8055/items/events')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw Error("Couldn't get data")
        })
        .then(({data}) => {
            setEvents(data);
        })
        .catch(err => console.log(err))
        }, 1500);

        return () => setEvents([]);
    }, []);

    useEffect(() => {
        const articles = document.querySelectorAll('.event');
        if(events.length) {
            articles.forEach(article => article.classList.add('active'))    
        }
        
        return () => {
            if(events.length) {
                articles.forEach(article => article.classList.remove('active'));
            }
        }
    }, [events]);

    return ( 
       <div className="events__wrapper">
            <Link className='events__back' to='/'><i className="fas fa-angle-left"></i></Link>
            <h2 className='events__heading' >Events</h2>
            {events.length ? null : <div className="events__loader"/>} 
            {data}
            {img ? 
            <Modal img={img} handleClose={closeModal}>
                <button className='events__left' onClick={() => changePhoto()}><i className="fas fa-arrow-circle-left"></i></button>
                <button className='events__right' onClick={() => changePhoto('next')}><i className="fas fa-arrow-circle-right"></i></button>
            </Modal> : null}
       </div> 
       
        
     );
}
 
export default Events;
