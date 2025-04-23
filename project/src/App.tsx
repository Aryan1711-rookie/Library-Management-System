//import Resources from './pages/Resources';
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import CatalogPage from "./component/Catalog";
import CatalogResource from "./pages/CatalogResource";
function App() {

  return (
    <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/" element={<Home/>}/>
      <Route path="/resources" element={<Resources/>}/>
      <Route path="/resource/:id" element={<ResourceDetail/>}/>
      <Route path="/browse-catalog" element={<CatalogPage/>}/>
      <Route path="/browse-catalog/:id" element={<CatalogResource/>}/>
    </Routes>
  );
}

export default App;