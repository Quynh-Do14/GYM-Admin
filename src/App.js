import './App.css';
import { privateRoutes } from './infrastructure/routes';
import { PrivateRoute } from './infrastructure/routes/private-router';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {privateRoutes.map((page, index) => {
            if (page.private) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <PrivateRoute component={<page.component />} />
                  } />
              )
            }
            else {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <page.component />
                  } />
              )
            }
          })}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
