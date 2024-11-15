import { useParams } from "react-router-dom";

const EditEventPage = () => {
  const { id } = useParams();

  return <div>edit event id: {id}</div>;
};

export default EditEventPage;
