import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();

  return <div>userpage id: {id}</div>;
};

export default UserPage;
