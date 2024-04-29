import Dashboard from './pages/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
	// return <Dashboard />;
	return (
	<BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
	)
};

export default App;
