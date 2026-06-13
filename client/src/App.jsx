import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MatchCenter from './pages/MatchCenter';
import GraphicsStudio from './pages/GraphicsStudio';

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(224 71% 8%)',
            color: 'hsl(213 31% 91%)',
            border: '1px solid hsl(216 34% 17%)',
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/match/:id" element={<MatchCenter />} />
          <Route path="/studio" element={<GraphicsStudio />} />
        </Route>
      </Routes>
    </>
  );
}
