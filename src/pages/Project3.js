import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HostingDomainComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('domain');
  const [selectedProvider, setSelectedProvider] = useState('all');

  // 도메인 가격 데이터
  const domainPricing = [
    {
      provider: 'Namecheap',
      comReg: 9.58,
      comRenew: 13.48,
      netReg: 12.98,
      netRenew: 14.98,
      orgReg: 12.98,
      orgRenew: 14.98,
      privacy: '무료',
      rating: 4.7,
      pros: ['가장 저렴한 갱신 비용', '무료 WHOIS 보호', '우수한 고객지원'],
      cons: ['초보자에게 다소 복잡', '프로모션 제한적']
    },
    {
      provider: 'GoDaddy',
      comReg: 0.01,
      comRenew: 19.99,
      netReg: 2.99,
      netRenew: 19.99,
      orgReg: 9.99,
      orgRenew: 19.99,
      privacy: '무료',
      rating: 4.2,
      pros: ['초년도 극저가', '브랜드 인지도', '통합 서비스'],
      cons: ['갱신 시 급격한 가격 상승', '적극적인 업셀링', '복잡한 인터페이스']
    },
    {
      provider: 'Google Domains',
      comReg: 12.00,
      comRenew: 12.00,
      netReg: 12.00,
      netRenew: 12.00,
      orgReg: 12.00,
      orgRenew: 12.00,
      privacy: '무료',
      rating: 4.6,
      pros: ['일관된 가격', '무료 프라이버시', '깔끔한 인터페이스'],
      cons: ['초기 가격 높음', 'VPS/호스팅 미제공', '제한된 TLD']
    },
    {
      provider: 'Bluehost',
      comReg: 8.99,
      comRenew: 17.99,
      netReg: 13.99,
      netRenew: 17.99,
      orgReg: 13.99,
      orgRenew: 17.99,
      privacy: '무료',
      rating: 4.4,
      pros: ['호스팅 통합', '무료 도메인(1년)', 'WordPress 공식 추천'],
      cons: ['갱신 시 가격 상승', '도메인 단독 구매 비효율']
    },
    {
      provider: 'Dynadot',
      comReg: 9.99,
      comRenew: 10.99,
      netReg: 12.99,
      netRenew: 13.99,
      orgReg: 13.99,
      orgRenew: 14.99,
      privacy: '무료',
      rating: 4.5,
      pros: ['저렴한 갱신', '무료 프라이버시', '간단한 관리'],
      cons: ['브랜드 인지도 낮음', '고급 기능 제한']
    }
  ];

  // 호스팅 가격 데이터
  const hostingPricing = [
    {
      provider: 'Bluehost',
      sharedPromo: 2.95,
      sharedRenew: 10.99,
      vpsStart: 19.99,
      dedicatedStart: 89.99,
      storage: '50GB',
      bandwidth: '무제한',
      sites: '1개',
      rating: 4.5,
      pros: ['WordPress 공식 추천', '무료 도메인(1년)', '무료 SSL', '초보자 친화적'],
      cons: ['갱신 가격 높음', '월간 결제 불가', '백업 유료']
    },
    {
      provider: 'HostGator',
      sharedPromo: 2.75,
      sharedRenew: 10.95,
      vpsStart: 23.95,
      dedicatedStart: 89.98,
      storage: '무제한',
      bandwidth: '무제한',
      sites: '무제한',
      rating: 4.3,
      pros: ['45일 환불', '무제한 사이트', '무료 마이그레이션', '월간 결제 가능'],
      cons: ['성능 중간', '업타임 불안정', '고객지원 품질 편차']
    },
    {
      provider: 'SiteGround',
      sharedPromo: 2.99,
      sharedRenew: 19.99,
      vpsStart: 0,
      dedicatedStart: 0,
      storage: '10GB',
      bandwidth: '무제한',
      sites: '1개',
      rating: 4.8,
      pros: ['최상급 성능', 'Google Cloud 인프라', '무료 CDN', '일일 백업', '최고 고객지원'],
      cons: ['높은 갱신 가격', '낮은 저장 용량', '방문자 수 제한', 'VPS 미제공']
    },
    {
      provider: 'Hostinger',
      sharedPromo: 1.99,
      sharedRenew: 8.99,
      vpsStart: 4.99,
      dedicatedStart: 0,
      storage: '50GB',
      bandwidth: '100GB',
      sites: '1개',
      rating: 4.6,
      pros: ['가장 저렴', 'LiteSpeed 서버', '무료 도메인', '우수한 가성비'],
      cons: ['주간 백업(하위 플랜)', '대역폭 제한', '전화 지원 없음']
    },
    {
      provider: 'A2 Hosting',
      sharedPromo: 2.99,
      sharedRenew: 10.99,
      vpsStart: 5.99,
      dedicatedStart: 105.99,
      storage: '100GB',
      bandwidth: '무제한',
      sites: '1개',
      rating: 4.6,
      pros: ['20배 빠른 속도', '무료 마이그레이션', '언제든 환불', '개발자 친화적'],
      cons: ['프로모션 제한적', '초보자에 복잡', '인터페이스 구식']
    },
    {
      provider: 'DreamHost',
      sharedPromo: 2.95,
      sharedRenew: 7.99,
      vpsStart: 13.75,
      dedicatedStart: 149.00,
      storage: '50GB',
      bandwidth: '무제한',
      sites: '1개',
      rating: 4.5,
      pros: ['97일 환불 보장', '저렴한 갱신', '개인정보 보호 중시', 'WordPress 추천'],
      cons: ['cPanel 미제공', '전화 지원 없음', '초보자에 어려움']
    }
  ];

  // AWS/Azure 클라우드 가격
  const cloudPricing = [
    {
      provider: 'AWS',
      tier: 't3.micro',
      vcpu: 2,
      ram: 1,
      price: 7.5,
      bandwidth: '월 15GB 무료',
      maxSites: 8,
      costPerSite: 0.94
    },
    {
      provider: 'AWS',
      tier: 't3.small',
      vcpu: 2,
      ram: 2,
      price: 15,
      bandwidth: '월 15GB 무료',
      maxSites: 15,
      costPerSite: 1.00
    },
    {
      provider: 'AWS',
      tier: 't3.medium',
      vcpu: 2,
      ram: 4,
      price: 30,
      bandwidth: '월 15GB 무료',
      maxSites: 30,
      costPerSite: 1.00
    },
    {
      provider: 'AWS',
      tier: 't3.large',
      vcpu: 2,
      ram: 8,
      price: 60,
      bandwidth: '월 15GB 무료',
      maxSites: 60,
      costPerSite: 1.00
    },
    {
      provider: 'Azure',
      tier: 'B1S',
      vcpu: 1,
      ram: 1,
      price: 7.6,
      bandwidth: '월 5GB 무료',
      maxSites: 6,
      costPerSite: 1.27
    },
    {
      provider: 'Azure',
      tier: 'B2S',
      vcpu: 2,
      ram: 4,
      price: 30,
      bandwidth: '월 5GB 무료',
      maxSites: 30,
      costPerSite: 1.00
    },
    {
      provider: 'Azure',
      tier: 'B2MS',
      vcpu: 2,
      ram: 8,
      price: 60,
      bandwidth: '월 5GB 무료',
      maxSites: 60,
      costPerSite: 1.00
    }
  ];

  // 도메인 비교 차트 데이터
  const domainChartData = domainPricing.map(d => ({
    name: d.provider,
    초년도: d.comReg,
    갱신: d.comRenew,
    평균: ((d.comReg + d.comRenew * 4) / 5).toFixed(2)
  }));

  // 호스팅 비교 차트 데이터
  const hostingChartData = hostingPricing.map(h => ({
    name: h.provider,
    프로모션: h.sharedPromo,
    갱신: h.sharedRenew,
    '5년평균': ((h.sharedPromo + h.sharedRenew * 4) / 5).toFixed(2)
  }));

  // 클라우드 비교 차트
  const cloudChartData = cloudPricing.map(c => ({
    name: `${c.provider} ${c.tier}`,
    월비용: c.price,
    사이트당: parseFloat(c.costPerSite)
  }));

  // 필터링된 데이터
  const getFilteredData = () => {
    if (selectedCategory === 'domain') {
      return selectedProvider === 'all' 
        ? domainPricing 
        : domainPricing.filter(d => d.provider === selectedProvider);
    } else if (selectedCategory === 'hosting') {
      return selectedProvider === 'all' 
        ? hostingPricing 
        : hostingPricing.filter(h => h.provider === selectedProvider);
    } else {
      return selectedProvider === 'all' 
        ? cloudPricing 
        : cloudPricing.filter(c => c.provider === selectedProvider);
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        도메인 & 호스팅 가격 종합 비교 (2025)
      </h1>
      <p className="text-gray-600 mb-6">주요 업체들의 최신 가격 및 특징 분석</p>

      {/* 카테고리 선택 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              비교 카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProvider('all');
              }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="domain">도메인 등록</option>
              <option value="hosting">웹 호스팅 (공유)</option>
              <option value="cloud">클라우드 서버 (AWS/Azure)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제공업체 필터
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">전체 비교</option>
              {selectedCategory === 'domain' && domainPricing.map(d => (
                <option key={d.provider} value={d.provider}>{d.provider}</option>
              ))}
              {selectedCategory === 'hosting' && hostingPricing.map(h => (
                <option key={h.provider} value={h.provider}>{h.provider}</option>
              ))}
              {selectedCategory === 'cloud' && ['AWS', 'Azure'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 도메인 가격 비교 차트 */}
      {selectedCategory === 'domain' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            .com 도메인 가격 비교 (연간)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: '가격 ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="초년도" fill="#3b82f6" name="초년도 등록" />
              <Bar dataKey="갱신" fill="#ef4444" name="갱신 비용" />
              <Bar dataKey="평균" fill="#10b981" name="5년 평균" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            💡 <strong>주의:</strong> 초년도 할인 후 갱신 가격이 크게 오르는 업체들이 있습니다.
          </p>
        </div>
      )}

      {/* 호스팅 가격 비교 차트 */}
      {selectedCategory === 'hosting' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            공유 호스팅 가격 비교 (월간)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hostingChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: '가격 ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="프로모션" fill="#3b82f6" name="프로모션 가격" />
              <Bar dataKey="갱신" fill="#ef4444" name="갱신 가격" />
              <Bar dataKey="5년평균" fill="#10b981" name="5년 평균" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 클라우드 비교 차트 */}
      {selectedCategory === 'cloud' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            클라우드 서버 비용 & 사이트당 비용
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cloudChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="월비용" fill="#3b82f6" name="월 비용 ($)" />
              <Bar dataKey="사이트당" fill="#10b981" name="사이트당 비용 ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 상세 비교 테이블 - 도메인 */}
      {selectedCategory === 'domain' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            도메인 등록 업체 상세 비교
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">업체</th>
                <th className="text-right p-3">.com 등록</th>
                <th className="text-right p-3">.com 갱신</th>
                <th className="text-right p-3">.net 등록</th>
                <th className="text-right p-3">.org 등록</th>
                <th className="text-center p-3">프라이버시</th>
                <th className="text-center p-3">평점</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((domain, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-semibold">{domain.provider}</td>
                  <td className="text-right p-3 text-green-600">${domain.comReg}</td>
                  <td className="text-right p-3 text-red-600">${domain.comRenew}</td>
                  <td className="text-right p-3">${domain.netReg}</td>
                  <td className="text-right p-3">${domain.orgReg}</td>
                  <td className="text-center p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      domain.privacy === '무료' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {domain.privacy}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <span className="font-semibold text-yellow-600">⭐ {domain.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 상세 비교 테이블 - 호스팅 */}
      {selectedCategory === 'hosting' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            웹 호스팅 업체 상세 비교 (Shared Hosting)
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">업체</th>
                <th className="text-right p-3">프로모션</th>
                <th className="text-right p-3">갱신</th>
                <th className="text-right p-3">VPS 시작</th>
                <th className="text-center p-3">저장공간</th>
                <th className="text-center p-3">대역폭</th>
                <th className="text-center p-3">평점</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((host, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-semibold">{host.provider}</td>
                  <td className="text-right p-3 text-green-600">${host.sharedPromo}/월</td>
                  <td className="text-right p-3 text-red-600">${host.sharedRenew}/월</td>
                  <td className="text-right p-3">
                    {host.vpsStart > 0 ? `$${host.vpsStart}/월` : 'N/A'}
                  </td>
                  <td className="text-center p-3">{host.storage}</td>
                  <td className="text-center p-3">{host.bandwidth}</td>
                  <td className="text-center p-3">
                    <span className="font-semibold text-yellow-600">⭐ {host.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 상세 비교 테이블 - 클라우드 */}
      {selectedCategory === 'cloud' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            클라우드 서버 스펙 & 비용
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">제공업체</th>
                <th className="text-left p-3">모델</th>
                <th className="text-center p-3">vCPU</th>
                <th className="text-center p-3">RAM (GB)</th>
                <th className="text-right p-3">월 비용</th>
                <th className="text-center p-3">최대 사이트</th>
                <th className="text-right p-3">사이트당 비용</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((cloud, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-semibold">{cloud.provider}</td>
                  <td className="p-3">{cloud.tier}</td>
                  <td className="text-center p-3">{cloud.vcpu}</td>
                  <td className="text-center p-3">{cloud.ram} GB</td>
                  <td className="text-right p-3 font-semibold text-blue-600">${cloud.price}</td>
                  <td className="text-center p-3 text-green-600">{cloud.maxSites}개</td>
                  <td className="text-right p-3 font-semibold">${cloud.costPerSite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 장단점 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {selectedCategory !== 'cloud' && filteredData.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-between">
              {item.provider}
              <span className="text-sm text-yellow-600">⭐ {item.rating}</span>
            </h3>
            
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-green-700 mb-1">✅ 장점</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {item.pros.map((pro, i) => (
                  <li key={i}>• {pro}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-1">❌ 단점</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {item.cons.map((con, i) => (
                  <li key={i}>• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 추천 시나리오 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">🎯 상황별 추천</h2>
        
        {selectedCategory === 'domain' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">💰 가격 중시형</h3>
              <p className="text-sm">Namecheap - 장기적으로 가장 저렴한 갱신 비용</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🏢 신뢰성 중시형</h3>
              <p className="text-sm">Google Domains - 일관된 가격, 깔끔한 관리</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🚀 빠른 시작형</h3>
              <p className="text-sm">GoDaddy - 초년도 $0.01, 통합 서비스</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🔐 프라이버시 중시</h3>
              <p className="text-sm">Dynadot 또는 Namecheap - 무료 WHOIS 보호</p>
            </div>
          </div>
        )}

        {selectedCategory === 'hosting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">💰 최저가 호스팅</h3>
              <p className="text-sm">Hostinger - $1.99/월, 우수한 가성비</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">⚡ 최고 성능</h3>
              <p className="text-sm">SiteGround - Google Cloud, 최상급 속도</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🎓 초보자</h3>
              <p className="text-sm">Bluehost - WordPress 공식 추천, 쉬운 사용</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🛠️ 개발자</h3>
              <p className="text-sm">A2 Hosting - 20배 속도, 고급 기능</p>
            </div>
          </div>
        )}

        {selectedCategory === 'cloud' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🏢 소규모 (1-15개 사이트)</h3>
              <p className="text-sm">AWS t3.small - $15/월, 사이트당 $1</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">📈 중규모 (16-30개)</h3>
              <p className="text-sm">AWS t3.medium - $30/월, 사이트당 $1</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">🚀 대규모 (31-60개)</h3>
              <p className="text-sm">AWS t3.large 또는 Azure B2MS - $60/월</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-4 rounded">
              <h3 className="font-bold mb-2">💡 비용 절약 팁</h3>
              <p className="text-sm">예약 인스턴스로 30-40% 절감</p>
            </div>
          </div>
        )}
      </div>

      {/* 실전 비용 시뮬레이션 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💰 실전 비용 계산 예시 (연간)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">항목</th>
                <th className="text-right p-3">저가형</th>
                <th className="text-right p-3">표준형</th>
                <th className="text-right p-3">프리미엄</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">도메인 (.com)</td>
                <td className="text-right p-3">$12</td>
                <td className="text-right p-3">$15</td>
                <td className="text-right p-3">$15</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3">호스팅 (월)</td>
                <td className="text-right p-3">$2-9</td>
                <td className="text-right p-3">$3-11</td>
                <td className="text-right p-3">$10-20</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3">SSL 인증서</td>
                <td className="text-right p-3">무료</td>
                <td className="text-right p-3">무료</td>
                <td className="text-right p-3">$50-200</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3">이메일 호스팅</td>
                <td className="text-right p-3">$0-30</td>
                <td className="text-right p-3">$30-60</td>
                <td className="text-right p-3">$60-144</td>
              </tr>
              <tr className="border-b-2 border-gray-300 font-bold">
                <td className="p-3">연간 총 비용</td>
                <td className="text-right p-3 text-green-600">$36-144</td>
                <td className="text-right p-3 text-blue-600">$96-201</td>
                <td className="text-right p-3 text-purple-600">$230-594</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded">
            <strong className="text-green-700">저가형 추천:</strong>
            <p className="text-gray-700">Hostinger + Namecheap</p>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <strong className="text-blue-700">표준형 추천:</strong>
            <p className="text-gray-700">Bluehost 통합 패키지</p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <strong className="text-purple-700">프리미엄 추천:</strong>
            <p className="text-gray-700">SiteGround + Google Workspace</p>
          </div>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 가격 비교 시 주의사항</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>프로모션 가격:</strong> 대부분 초년도만 적용, 갱신 시 2-3배 상승</li>
          <li>• <strong>약정 기간:</strong> 장기 약정 시 할인률 높지만 환불 제한</li>
          <li>• <strong>숨은 비용:</strong> 백업, 프라이버시, 이메일 등 추가 비용 확인</li>
          <li>• <strong>성능 vs 가격:</strong> 저가형은 자원 공유로 속도 저하 가능</li>
          <li>• <strong>환불 정책:</strong> 30-97일 보장 기간 확인 필수</li>
        </ul>
      </div>
    </div>
  );
};

export default HostingDomainComparison;