import { useParams } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams();

  return <div>eventpage id: {id}</div>;
};

export default EventPage;
