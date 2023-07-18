import React, {useState, useEffect } from 'react';

function ConferenceForm( ) {
    const [locations, setLocations] = useState([]);

    const [name, setName] = useState('')
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const [startDate, setStartDate] = useState('')
    const handleStartDateChange = (event) => {
        const value = event.target.value;
        setStartDate(value);
    }
    const [endDate, setEndDate] = useState('')
    const handleEndDateChange = (event) => {
        const value = event.target.value;
        setEndDate(value);
    }
    const [description, setDescription] = useState('')
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const [maxPresentations, setMaxPresentations] = useState('')
    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }
    const [maxAttendees, setMaxAttendees] = useState('')
    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }
    const [location, setLocation] = useState('')
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }




    const fetchData = async () => {
      const url = 'http://localhost:8000/api/locations/';

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setLocations(data.locations)
        console.log(data)
      }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.starts = startDate;
        data.ends = endDate;
        data.location = location;
        console.log(data);
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);
        setName('');
        setDescription('');
        setMaxPresentations('');
        setMaxAttendees('');
        setStartDate('');
        setEndDate('');
        setLocation('');
    }
    }
    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit= {handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange= {handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleStartDateChange} placeholder="starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleEndDateChange} placeholder="ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="name">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea onChange= {handleDescriptionChange} className="form-control" name="description" id="description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleMaxPresentationsChange} placeholder="max_presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleMaxAttendeesChange} placeholder="max_attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange= {handleLocationChange} required id="location" name= "location" className="form-select">
                  <option value="">Choose a Location</option>
                  {locations.map(location => {
                    return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                            </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default ConferenceForm;
