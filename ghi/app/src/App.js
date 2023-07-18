import Nav from './Nav';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <BrowserRouter>
    <Nav />
    <div className="container">
      <Routes>
      <Route index element={<MainPage />} />
      <Route path="conferences">
        <Route path="new" element={<ConferenceForm />}/>
      </Route>
      <Route path="locations">
        <Route path="new" element={<LocationForm />} />
      </Route>
      <Route path="presentations">
        <Route path="new" element={<PresentationForm />}/>
      </Route>
      {/* <AttendeesList attendees={props.attendees} /> */}
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
};

export default App;
