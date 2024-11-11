export const getHome = async () => {
    const response = await fetch("http://localhost:3100/api/home");
    return response.json();
  };
  