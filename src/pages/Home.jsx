import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="container text-center my-5">

    </div>
  );
};

export default Home;