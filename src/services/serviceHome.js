export const getHome = async () => {
  try {
    const [homeResponse] = await Promise.all([
      fetch("http://localhost:3000/api/home"),
    ]);

    // Parseamos las respuestas como JSON
    const homeData = await homeResponse.json();

    return {
      homeData
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
