import { useAuth } from "../hooks/useAuth";
import { useCounter } from "../hooks/useCounter";

const Home = () => {
  const { user } = useAuth();
  const { count, increment } = useCounter();

  return (
    <div className="container text-center my-5">

    </div>
  );
};

export default Home;