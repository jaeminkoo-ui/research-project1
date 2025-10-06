import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import Project3 from './pages/Project3';
import Project4 from './pages/Project4';
import Project5 from './pages/Project5';

function App() {
  return (
    <BrowserRouter basename="/project1">
      <div>
        <nav style={{ padding: '20px', backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
          <Link to="/1" style={{ marginRight: '20px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            AI 웹사이트 사업 전략
          </Link>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>|</span>
          <Link to="/2" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            클라우드 서버 비교
          </Link>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>|</span>
          <Link to="/3" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            도메인 & 호스팅 가격 비교
          </Link>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>|</span>
          <Link to="/4" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            웹호스팅 서버용량 & 비용 계산기
          </Link>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>|</span>
          <Link to="/5" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            비즈니스 모델 수익 시뮬레이션
          </Link>
        </nav>

        <Routes>
          <Route path="/1" element={<Project1 />} />
          <Route path="/2" element={<Project2 />} />
          <Route path="/3" element={<Project3 />} />
          <Route path="/4" element={<Project4 />} />
          <Route path="/5" element={<Project5 />} />
          <Route path="/" element={<Project1 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;