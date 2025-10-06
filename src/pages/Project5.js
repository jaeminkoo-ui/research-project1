import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BusinessROISimulator = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(0);
  
  const businessModels = [
    {
      id: 1,
      name: "연예인 짜집기 + 쿠팡",
      initialCost: 0,
      monthlyHours: 80,
      revenue: [0, 10, 20, 30, 40, 50, 50, 40, 30, 20, 10, 0],
      risk: "매우 높음 (법적)",
      color: "#ef4444"
    },
    {
      id: 2,
      name: "시니어 라디오 드라마",
      initialCost: 500,
      monthlyHours: 60,
      revenue: [5, 10, 15, 25, 40, 70, 120, 200, 320, 480, 650, 850],
      risk: "낮음",
      color: "#8b5cf6"
    },
    {
      id: 3,
      name: "시니어 건강 정보 다국어",
      initialCost: 200,
      monthlyHours: 70,
      revenue: [10, 30, 60, 120, 220, 380, 600, 900, 1300, 1800, 2400, 3000],
      risk: "중간 (의료정보 정확성)",
      color: "#10b981"
    },
    {
      id: 4,
      name: "아동 영어 동화",
      initialCost: 300,
      monthlyHours: 50,
      revenue: [20, 50, 100, 200, 400, 700, 1100, 1600, 2200, 3000, 3900, 5000],
      risk: "낮음",
      color: "#f59e0b"
    },
    {
      id: 5,
      name: "AI 숏폼 드라마",
      initialCost: 100,
      monthlyHours: 90,
      revenue: [5, 15, 50, 100, 200, 350, 500, 650, 800, 1000, 1300, 2000],
      risk: "중간 (수익 불안정)",
      color: "#ec4899"
    },
    {
      id: 6,
      name: "SUNO 음원 수익",
      initialCost: 50,
      monthlyHours: 40,
      revenue: [1, 3, 8, 15, 30, 55, 90, 140, 210, 320, 480, 700],
      risk: "낮음",
      color: "#06b6d4"
    },
    {
      id: 7,
      name: "수입 양말 판매",
      initialCost: 2000,
      monthlyHours: 100,
      revenue: [200, 400, 600, 800, 1200, 1800, 2500, 3500, 5000, 8000, 15000, 12000],
      risk: "중간 (재고)",
      color: "#f97316"
    },
    {
      id: 8,
      name: "AI 웹사이트 구독",
      initialCost: 100,
      monthlyHours: 80,
      revenue: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3300, 4200, 5000],
      risk: "낮음",
      color: "#3b82f6"
    }
  ];

  // 월별 누적 데이터 생성
  const generateMonthlyData = () => {
    return businessModels[selectedBusiness].revenue.map((revenue, index) => ({
      month: `${index + 1}월`,
      revenue: revenue,
      cumulative: businessModels[selectedBusiness].revenue
        .slice(0, index + 1)
        .reduce((sum, val) => sum + val, 0)
    }));
  };

  // ROI 계산
  const calculateROI = (model) => {
    const totalRevenue = model.revenue.reduce((sum, val) => sum + val, 0);
    const totalCost = model.initialCost + (model.monthlyHours * 12 * 15); // $15/시간으로 가정
    const roi = ((totalRevenue - totalCost) / totalCost * 100).toFixed(1);
    const hourlyRate = (totalRevenue / (model.monthlyHours * 12)).toFixed(2);
    const breakEvenMonth = model.revenue.findIndex((val, idx) => {
      const cumulative = model.revenue.slice(0, idx + 1).reduce((sum, v) => sum + v, 0);
      return cumulative >= model.initialCost;
    }) + 1;
    
    return { roi, hourlyRate, breakEvenMonth, totalRevenue };
  };

  // 모든 비즈니스 ROI 비교 데이터
  const comparisonData = businessModels.map(model => {
    const { roi, hourlyRate, totalRevenue } = calculateROI(model);
    return {
      name: model.name.split(' ')[0] + (model.name.split(' ')[1] || ''),
      ROI: parseFloat(roi),
      시간당수익: parseFloat(hourlyRate),
      연간수익: totalRevenue
    };
  });

  const currentModel = businessModels[selectedBusiness];
  const currentStats = calculateROI(currentModel);
  const monthlyData = generateMonthlyData();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        비즈니스 모델 수익 시뮬레이션 & ROI 분석
      </h1>

      {/* 비즈니스 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          비즈니스 모델 선택
        </label>
        <select
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(parseInt(e.target.value))}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          {businessModels.map((model, idx) => (
            <option key={model.id} value={idx}>
              {model.id}. {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">초기 투자</div>
          <div className="text-2xl font-bold text-gray-800">
            ${currentModel.initialCost}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">월 작업시간</div>
          <div className="text-2xl font-bold text-gray-800">
            {currentModel.monthlyHours}h
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">연간 총수익</div>
          <div className="text-2xl font-bold text-green-600">
            ${currentStats.totalRevenue}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">ROI</div>
          <div className={`text-2xl font-bold ${parseFloat(currentStats.roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentStats.roi}%
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">시간당 수익</div>
          <div className="text-2xl font-bold text-blue-600">
            ${currentStats.hourlyRate}
          </div>
        </div>
      </div>

      {/* 손익분기점 & 리스크 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-semibold text-gray-700 mb-2">손익분기점</div>
          <div className="text-xl font-bold text-blue-600">
            {currentStats.breakEvenMonth > 0 ? `${currentStats.breakEvenMonth}개월` : '데이터 내 도달 불가'}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-semibold text-gray-700 mb-2">리스크 수준</div>
          <div className={`text-xl font-bold ${
            currentModel.risk.includes('높음') ? 'text-red-600' :
            currentModel.risk.includes('중간') ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {currentModel.risk}
          </div>
        </div>
      </div>

      {/* 월별 수익 추이 그래프 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">월별 수익 추이</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke={currentModel.color} strokeWidth={3} name="월 수익" />
            <Line type="monotone" dataKey="cumulative" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" name="누적 수익" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ROI 비교 차트 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">전체 비즈니스 ROI 비교</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ROI" fill="#3b82f6" name="ROI (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 시간당 수익 비교 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">시간당 수익률 비교</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="시간당수익" fill="#10b981" name="시간당 수익 ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 요약 테이블 */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">전체 비즈니스 요약</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2">비즈니스</th>
              <th className="text-right p-2">초기투자</th>
              <th className="text-right p-2">월작업시간</th>
              <th className="text-right p-2">연간수익</th>
              <th className="text-right p-2">ROI</th>
              <th className="text-right p-2">시간당수익</th>
              <th className="text-left p-2">리스크</th>
            </tr>
          </thead>
          <tbody>
            {businessModels.map((model, idx) => {
              const stats = calculateROI(model);
              return (
                <tr key={model.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 font-medium">{model.name}</td>
                  <td className="text-right p-2">${model.initialCost}</td>
                  <td className="text-right p-2">{model.monthlyHours}h</td>
                  <td className="text-right p-2 font-semibold text-green-600">${stats.totalRevenue}</td>
                  <td className={`text-right p-2 font-semibold ${parseFloat(stats.roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.roi}%
                  </td>
                  <td className="text-right p-2 font-semibold text-blue-600">${stats.hourlyRate}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      model.risk.includes('높음') ? 'bg-red-100 text-red-700' :
                      model.risk.includes('중간') ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {model.risk}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 참고사항 */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>참고:</strong> 이 시뮬레이션은 예상치이며 실제 결과는 시장 상황, 실행 능력, 마케팅 효과 등에 따라 크게 달라질 수 있습니다. 
          시간당 비용은 $15/시간으로 계산되었습니다.
        </p>
      </div>
    </div>
  );
};

export default BusinessROISimulator;