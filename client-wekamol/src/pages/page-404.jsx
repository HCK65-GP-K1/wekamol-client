import { useNavigate } from "react-router-dom";

export default function FourOFourPage() {
  let navigate = useNavigate("");

  const backgroundImage = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: "brightness(90%)",
  };

  async function handleNavToMainPage(event) {
    try {
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <>
      <section
        className="flex justify-center h-screen items-center"
        style={backgroundImage}
      >
        <div className="container my-12 flex justify-center items-center h-fit p-8 backdrop-blur-lg rounded-xl">
          <div>
            <h1 className="text-8xl"> Oh No.......</h1>
            <h2 className="text-6xl">
              the page you're looking for isn't exist.......{" "}
              <span className="text-lg">yet</span>
            </h2>
          </div>
          <div className="tooltip" data-tip="back to main page">
            <button
              className="btn btn-primary btn-circle w-24 h-24"
              onClick={handleNavToMainPage}
            >
              Logo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
