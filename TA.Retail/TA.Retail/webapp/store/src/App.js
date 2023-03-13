import logo from './logo.svg';
import './App.css';
import StoreDetails from './pages/StoreDetails';
import UploadFeedPage from './pages/UploadFeedPage';
import { Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  return (
    <div>
    <h1>Retail Store</h1>

    <p>

    </p>

    {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UploadFeedPage />} />
        <Route path="upload" element={<UploadFeedPage />} />
        <Route path="store-details" element={<StoreDetails />} />

       
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </div>
);
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload Feed</Link>
          </li>
          <li>
            <Link to="/store-details">Store Details</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default App;
