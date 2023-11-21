import React, { useRef } from 'react'

function UpdateEvent() {
    const eventNameRef = useRef()
    const eventDateRef = useRef()
    const eventTimeRef = useRef()
    const eventVenueRef = useRef()
    const eventDiscriptionRef = useRef()


  return (
    <div>
      <div className='form'>
        <form>
            <input type='text' placeholder='Name' ref={eventNameRef}/>
            <input type='date' placeholder='Date' ref={eventDateRef}/>
            <input type='time' placeholder='Time' ref={eventTimeRef}/>
            <input type='text' placeholder='Venue' ref={eventVenueRef}/>
            <input type='text' placeholder='Description' ref={eventDiscriptionRef}/>
            <input type='submit'/>
        </form>
      </div>
    </div>
  )
}

export default UpdateEvent
