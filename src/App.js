import FrontPage from './components/FrontPage';
import TextEditor from './components/TextEditor';
import { Routes, Route, Navigate } from 'react-router-dom';
import Result from './components/Result';
import PageNotFound from './components/PageNotFound';
import './App.css';


function App() {



  return (
    <div className="w-[100vw] h-[100vh] bg-[#e6ffff] flex justify-center items-center">
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/editor" element={<TextEditor />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
