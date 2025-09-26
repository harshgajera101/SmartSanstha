import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  const element = useRoutes(routes)
  return element
}


// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* Add other routes like Learn, Games, Dashboard */}
//     </Routes>
//   );
// }

// export default App;
