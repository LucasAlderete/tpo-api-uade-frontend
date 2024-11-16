export const getHome = async () => {
    const response = await fetch("http://localhost:3000/home");
    return response.json();
  };
  