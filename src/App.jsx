import {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from './pages/index';
import ErrorPage from './error-page';
import '@picocss/pico'
import './App.css';
import { supabase } from './client';
export default function App() {
  const [creators, setCreators] = useState([])
  useEffect(()=>{
    async function fetchCreators() {
      try {
        const {data, error} = await supabase
          .from('creators')
          .select() // '*'
          .order('created_at', { ascending: true })
        if (error) {
          throw new Error(error.message)
        }
        setCreators(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchCreators()
  }, [])
  return (
    <Router>
        <main style={{height:"100vh"}}>
          <section style={{ padding: "10px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <Routes>
              <Route path="/" element={<ShowCreators data={creators} />} />
              <Route path="/edit/:id/:name" element={<EditCreator data={creators} />} />
              <Route path="/new" element={<AddCreator />} />
              <Route path="/view/:id/:name" element={<ViewCreator data={creators} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </section>
        </main>
    </Router>
  );
}