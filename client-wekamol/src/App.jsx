import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <section className="flex justify-center border h-screen p-4">
        <h1>BASEGAME</h1>
      </section>
    </>
  );

  // return (
  //   <>
  //     <Provider store={store}>
  //       <RouterProvider router={router} />
  //     </Provider>
  //   </>
  // );
}

export default App;
