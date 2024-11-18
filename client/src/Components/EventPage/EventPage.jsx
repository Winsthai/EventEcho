import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const events = [
  {
      "id": "1",
      "title": "Football Game",
      "eventtype": "Sports",
      "description": "A friendly neighborhood football game.",
      "address": "123 Stadium Rd, City",
      "coordinates": {
          "x": 40.7128,
          "y": -74.006
      },
      "startdate": "2024-11-15T00:00:00.000Z",
      "starttime": "15:00:00+00",
      "enddate": "2024-11-15T00:00:00.000Z",
      "endtime": "17:00:00+00",
      "visibility": true
  },
  {
      "id": "2",
      "title": "Jazz Concert",
      "eventtype": "Music",
      "description": "Live jazz performance.",
      "address": "456 Music Hall Ave, City",
      "coordinates": {
          "x": 40.7306,
          "y": -73.9352
      },
      "startdate": "2024-12-01T00:00:00.000Z",
      "starttime": "19:00:00+00",
      "enddate": "2024-12-01T00:00:00.000Z",
      "endtime": "21:00:00+00",
      "visibility": true
  },
  {
      "id": "3",
      "title": "Food Festival",
      "eventtype": "Food",
      "description": "A festival with foods from around the world.",
      "address": "789 Gourmet St, City",
      "coordinates": {
          "x": 40.7612,
          "y": -73.9822
      },
      "startdate": "2024-11-20T00:00:00.000Z",
      "starttime": "11:00:00+00",
      "enddate": "2024-11-20T00:00:00.000Z",
      "endtime": "16:00:00+00",
      "visibility": false
  },
  {
      "id": "4",
      "title": "Art Exhibit",
      "eventtype": "Art",
      "description": "Exhibition of modern art pieces.",
      "address": "101 Art Museum Blvd, City",
      "coordinates": {
          "x": 40.7488,
          "y": -73.9854
      },
      "startdate": "2024-12-05T00:00:00.000Z",
      "starttime": "09:00:00+00",
      "enddate": null,
      "endtime": null,
      "visibility": true
  },
  {
      "id": "5",
      "title": "Gaming Convention",
      "eventtype": "Gaming",
      "description": "A gaming event for all ages.",
      "address": "202 Gaming Arena, City",
      "coordinates": {
          "x": 40.7549,
          "y": -73.984
      },
      "startdate": "2024-12-10T00:00:00.000Z",
      "starttime": "10:00:00+00",
      "enddate": "2024-12-12T00:00:00.000Z",
      "endtime": "20:00:00+00",
      "visibility": false
  }
];

const EventPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  const [event, setEvent] = useState(null);

  // check which id is in test data. useEffect. Tell it to get event based on ID. useEffect runs when the page is loaded
  useEffect(() => {
    const result = events.find((element) => element.id === id);
    setEvent(result);
    // stuff here
  }, []); // empty array, means it doesn't rerun

  return <div>eventpage id: {id}</div>;


  
};



export default EventPage;
