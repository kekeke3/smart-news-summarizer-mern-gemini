import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleView from "./pages/ArticleView";
import SavedArticles from "./pages/SavedArticles";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/article" element={<ArticleView />} />

          <Route path="saved" element={<SavedArticles />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
