import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HostingCostCalculator = () => {
  const [numSites, setNumSites] = useState(10);
  const [trafficLevel, setTrafficLevel] = useState('medium');
  const [provider, setProvider] = useState('aws');

  // 트래픽 레벨 정의
  const trafficLevels = {
    low: {
      name: '낮음 (월 1K-5K 방문)',
      monthlyVisitors: 3000,
      avgPageViews: 3,
      pageSize: 2, // MB
      peakConcurrent: 5
    },
    medium: {
      name: '중간 (월 5K-20K 방문)',
      monthlyVisitors: 12000,
      avgPageViews: 4,
      pageSize: 2.5,
      peakConcurrent: 15
    },
    high: {
      name: '높음 (월 20K-50K 방문)',
      monthlyVisitors: 35000,
      avgPageViews: 5,
      pageSize: 3,
      peakConcurrent: 40
    }
  };

  // 서버 스펙 정의
  const serverSpecs = {
    aws: [
      {
        name: 't3.micro',
        vcpu: 2,
        ram: 1,
        price: 7.5,
        maxSites: { low: 15, medium: 8, high: 3 },
        description: '초소형'
      },
      {
        name: 't3.small',
        vcpu: 2,
        ram: 2,
        price: 15,
        maxSites: { low: 30, medium: 15, high: 6 },
        description: '소형'
      },
      {
        name: 't3.medium',
        vcpu: 2,
        ram: 4,
        price: 30,
        maxSites: { low: 60, medium: 30, high: 12 },
        description: '중형'
      },
      {
        name: 't3.large',
        vcpu: 2,
        ram: 8,
        price: 60,
        maxSites: { low: 120, medium: 60, high: 25 },
        description: '대형'
      },
      {
        name: 't3.xlarge',
        vcpu: 4,
        ram: 16,
        price: 120,
        maxSites: { low: 250, medium: 120, high: 50 },
        description: '초대형'
      }
    ],
    azure: [
      {
        name: 'B1S',
        vcpu: 1,
        ram: 1,
        price: 7.6,
        maxSites: { low: 12, medium: 6, high: 2 },
        description: '초소형'
      },
      {
        name: 'B2S',
        vcpu: 2,
        ram: 4,
        price: 30,
        maxSites: { low: 60, medium: 30, high: 12 },
        description: '소형'
      },
      {
        name: 'B2MS',
        vcpu: 2,
        ram: 8,
        price: 60,
        maxSites: { low: 120, medium: 60, high: 25 },
        description: '중형'
      },
      {
        name: 'B4MS',
        vcpu: 4,
        ram: 16,
        price: 120,
        maxSites: { low: 250, medium: 120, high: 50 },
        description: '대형'
      },
      {
        name: 'B8MS',
        vcpu: 8,
        ram: 32,
        price: 240,
        maxSites: { low: 500, medium: 250, high: 100 },
        description: '초대형'
      }
    ]
  };

  // 최적 서버 선택 로직
  const findOptimalServer = () => {
    const specs = serverSpecs[provider];
    const traffic = trafficLevels[trafficLevel];
    
    for (let server of specs) {
      if (server.maxSites[trafficLevel] >= numSites) {
        return server;
      }
    }
    
    // 최대 서버로도 부족한 경우 여러 서버 필요
    const lastServer = specs[specs.length - 1];
    const serversNeeded = Math.ceil(numSites / lastServer.maxSites[trafficLevel]);
    return {
      ...lastServer,
      serversNeeded,
      totalPrice: lastServer.price * serversNeeded
    };
  };

  // 비용 대비 효율성 계산
  const calculateCostPerSite = () => {
    const optimal = findOptimalServer();
    const totalCost = optimal.serversNeeded 
      ? optimal.totalPrice 
      : optimal.price;
    return (totalCost / numSites).toFixed(2);
  };

  // 대역폭 계산
  const calculateBandwidth = () => {
    const traffic = trafficLevels[trafficLevel];
    const monthlyPageViews = traffic.monthlyVisitors * traffic.avgPageViews * numSites;
    const bandwidthGB = (monthlyPageViews * traffic.pageSize) / 1024;
    return bandwidthGB.toFixed(1);
  };

  // 사이트 수에 따른 비용 차트 데이터
  const generateCostChart = () => {
    const data = [];
    const specs = serverSpecs[provider];
    
    for (let sites = 5; sites <= 100; sites += 5) {
      let optimalServer = null;
      let serversNeeded = 1;
      
      for (let server of specs) {
        if (server.maxSites[trafficLevel] >= sites) {
          optimalServer = server;
          break;
        }
      }
      
      if (!optimalServer) {
        const lastServer = specs[specs.length - 1];
        serversNeeded = Math.ceil(sites / lastServer.maxSites[trafficLevel]);
        optimalServer = lastServer;
      }
      
      data.push({
        sites: sites,
        cost: optimalServer.price * serversNeeded,
        costPerSite: (optimalServer.price * serversNeeded / sites).toFixed(2)
      });
    }
    
    return data;
  };

  const optimalServer = findOptimalServer();
  const costPerSite = calculateCostPerSite();
  const bandwidth = calculateBandwidth();
  const chartData = generateCostChart();

  // 모든 서버 옵션 비교 테이블 데이터
  const allServerOptions = serverSpecs[provider].map(server => ({
    name: server.name,
    spec: `${server.vcpu} vCPU / ${server.ram}GB RAM`,
    maxSites: server.maxSites[trafficLevel],
    price: server.price,
    costPerSite: (server.price / server.maxSites[trafficLevel]).toFixed(2),
    recommended: server.maxSites[trafficLevel] >= numSites && 
                 (!serverSpecs[provider].find(s => 
                   s.maxSites[trafficLevel] >= numSites && s.price < server.price
                 ) || server.name === optimalServer.name)
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        웹사이트 호스팅 서버 용량 & 비용 계산기
      </h1>
      <p className="text-gray-600 mb-6">정보성 웹사이트 호스팅 최적화 분석</p>

      {/* 입력 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 호스팅할 사이트 수 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              호스팅할 사이트 수
            </label>
            <input
              type="number"
              value={numSites}
              onChange={(e) => setNumSites(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              min="1"
              max="500"
            />
            <div className="mt-2">
              <input
                type="range"
                value={numSites}
                onChange={(e) => setNumSites(parseInt(e.target.value))}
                className="w-full"
                min="1"
                max="100"
              />
            </div>
          </div>

          {/* 트래픽 레벨 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              사이트당 평균 트래픽
            </label>
            <select
              value={trafficLevel}
              onChange={(e) => setTrafficLevel(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="low">낮음 (월 1K-5K)</option>
              <option value="medium">중간 (월 5K-20K)</option>
              <option value="high">높음 (월 20K-50K)</option>
            </select>
          </div>

          {/* 클라우드 제공자 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              클라우드 제공자
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="aws">AWS (Amazon)</option>
              <option value="azure">Azure (Microsoft)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 추천 서버 스펙 카드 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">
          🎯 추천 서버 구성
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-blue-100 text-sm mb-1">서버 모델</div>
            <div className="text-2xl font-bold">
              {optimalServer.name}
            </div>
          </div>
          <div>
            <div className="text-blue-100 text-sm mb-1">스펙</div>
            <div className="text-xl font-semibold">
              {optimalServer.vcpu} vCPU / {optimalServer.ram}GB RAM
            </div>
          </div>
          <div>
            <div className="text-blue-100 text-sm mb-1">월 비용</div>
            <div className="text-2xl font-bold">
              ${optimalServer.serversNeeded 
                ? optimalServer.totalPrice 
                : optimalServer.price}
            </div>
          </div>
          <div>
            <div className="text-blue-100 text-sm mb-1">사이트당 비용</div>
            <div className="text-2xl font-bold">
              ${costPerSite}
            </div>
          </div>
        </div>
        
        {optimalServer.serversNeeded && (
          <div className="mt-4 bg-blue-400 bg-opacity-30 p-3 rounded">
            <p className="text-sm">
              ⚠️ {numSites}개 사이트를 호스팅하려면 <strong>{optimalServer.serversNeeded}개의 서버</strong>가 필요합니다.
            </p>
          </div>
        )}
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">예상 대역폭</div>
          <div className="text-2xl font-bold text-gray-800">{bandwidth} GB/월</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">최대 호스팅 가능</div>
          <div className="text-2xl font-bold text-green-600">
            {optimalServer.maxSites ? optimalServer.maxSites[trafficLevel] : 'N/A'} 사이트
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">여유 용량</div>
          <div className="text-2xl font-bold text-blue-600">
            {optimalServer.maxSites 
              ? Math.max(0, optimalServer.maxSites[trafficLevel] - numSites)
              : 0} 사이트
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">용량 사용률</div>
          <div className="text-2xl font-bold text-purple-600">
            {optimalServer.maxSites 
              ? Math.min(100, ((numSites / optimalServer.maxSites[trafficLevel]) * 100).toFixed(0))
              : 100}%
          </div>
        </div>
      </div>

      {/* 사이트 수 대비 비용 차트 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          사이트 수에 따른 월 비용 추이
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sites" label={{ value: '사이트 수', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: '월 비용 ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} name="총 비용 ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 사이트당 비용 효율성 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          규모의 경제: 사이트당 비용
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sites" label={{ value: '사이트 수', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: '사이트당 비용 ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="costPerSite" stroke="#10b981" strokeWidth={3} name="사이트당 비용 ($)" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          💡 사이트 수가 증가할수록 사이트당 비용이 감소합니다 (규모의 경제)
        </p>
      </div>

      {/* 전체 서버 옵션 비교 테이블 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {provider === 'aws' ? 'AWS' : 'Azure'} 서버 옵션 비교
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">서버 모델</th>
                <th className="text-left p-3">스펙</th>
                <th className="text-right p-3">최대 사이트 수</th>
                <th className="text-right p-3">월 비용</th>
                <th className="text-right p-3">사이트당 비용</th>
                <th className="text-center p-3">추천</th>
              </tr>
            </thead>
            <tbody>
              {allServerOptions.map((option, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-gray-200 ${
                    option.recommended ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="p-3 font-medium">{option.name}</td>
                  <td className="p-3 text-gray-600">{option.spec}</td>
                  <td className="text-right p-3 font-semibold text-green-600">
                    {option.maxSites}
                  </td>
                  <td className="text-right p-3 font-semibold">
                    ${option.price}
                  </td>
                  <td className="text-right p-3 font-semibold text-blue-600">
                    ${option.costPerSite}
                  </td>
                  <td className="text-center p-3">
                    {option.recommended && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        추천
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 비용 절감 팁 */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
        <h3 className="font-semibold text-green-800 mb-2">💰 비용 절감 팁</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>예약 인스턴스:</strong> 1년 약정 시 30-40% 할인 가능</li>
          <li>• <strong>스팟 인스턴스:</strong> 최대 90% 할인 (개발/테스트 환경)</li>
          <li>• <strong>CDN 활용:</strong> Cloudflare 등으로 대역폭 비용 절감</li>
          <li>• <strong>정적 사이트:</strong> S3 + CloudFront로 $1-5/월 가능</li>
          <li>• <strong>캐싱:</strong> Redis/Memcached로 서버 부하 50-70% 감소</li>
        </ul>
      </div>

      {/* 추가 비용 안내 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 추가 비용 고려사항</h3>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• <strong>대역폭:</strong> 월 100GB까지 무료, 이후 GB당 $0.09-0.12</p>
          <p>• <strong>스토리지:</strong> 100GB SSD - 월 $10 정도 추가</p>
          <p>• <strong>백업:</strong> 자동 백업 월 $5-20</p>
          <p>• <strong>도메인:</strong> 사이트당 연 $10-15</p>
          <p>• <strong>SSL 인증서:</strong> Let's Encrypt 무료 또는 사이트당 연 $50-200</p>
          <p className="mt-2 font-semibold">
            → 사이트당 실제 총 비용: ${(parseFloat(costPerSite) + 2.5).toFixed(2)}/월 예상
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostingCostCalculator;