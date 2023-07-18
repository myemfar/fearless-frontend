import React, { useEffect, useState } from 'react';

function ConferenceForm() {
  const [locations, setLocations] = useState([])

  //Notice that we can condense all formData
  //into one state object
  const [formData, setFormData] = useState({
    name: '',
    starts: '',
    ends: '',
    description: '',
    max_presentations: '',
    max_attendees: '',
    location: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/api/conferences/';

    const fetchConfig = {
      method: "post",
      //Because we are using one formData state object,
      //we can now pass it directly into our request!
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      //The single formData object
      //also allows for easier clearing of data
      setFormData({
        name: '',
        starts: '',
        ends: '',
        description: '',
        max_presentations: '',
        max_attendees: '',
        location: '',
      });
    }
  }

  //Notice that we can also replace multiple form change
  //eventListener functions with one
  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    //We can condense our form data event handling
    //into on function by using the input name to update it

    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,

      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
              <label htmlFor="starts">Starts</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
              <label htmlFor="ends">Ends</label>
            </div>

            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea onChange={handleFormChange} className="form-control" id="description" rows="3" name="description" className="form-control"></textarea>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" />
              <label htmlFor="max_presentations">Maximum presentations</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" />
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} required name="location" id="location" className="form-select">
                <option value="">Choose a location</option>
                {locations.map(location => {
                  return (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConferenceForm;
