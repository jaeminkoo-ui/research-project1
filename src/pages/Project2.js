import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CloudProvidersComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // 클라우드 제공업체 데이터
  const providers = [
    {
      name: 'AWS',
      category: 'hyperscaler',
      region: 'global',
      founded: 2006,
      entryPrice: 7.50,
      midPrice: 30,
      datacenters: 32,
      ease: 4,
      performance: 95,
      support: 85,
      pricing: 60,
      features: 98,
      globalReach: 98,
      bandwidth: '월 15GB 무료',
      pros: ['압도적 서비스 범위', '최고 수준 안정성', '글로벌 리더'],
      cons: ['복잡한 인터페이스', '높은 비용', '숨겨진 요금'],
      bestFor: '대기업, 복잡한 인프라'
    },
    {
      name: 'Azure',
      category: 'hyperscaler',
      region: 'global',
      founded: 2010,
      entryPrice: 7.60,
      midPrice: 30,
      datacenters: 60,
      ease: 5,
      performance: 93,
      support: 87,
      pricing: 62,
      features: 97,
      globalReach: 100,
      bandwidth: '월 5GB 무료',
      pros: ['가장 많은 데이터센터', 'MS 제품 통합', '기업용 기능'],
      cons: ['복잡한 가격 구조', '학습 곡선 가파름'],
      bestFor: 'MS 생태계 기업'
    },
    {
      name: 'Google Cloud',
      category: 'hyperscaler',
      region: 'global',
      founded: 2008,
      entryPrice: 7.11,
      midPrice: 28.50,
      datacenters: 35,
      ease: 6,
      performance: 96,
      support: 80,
      pricing: 65,
      features: 95,
      globalReach: 95,
      bandwidth: '월 1GB 무료',
      pros: ['최고 성능', 'AI/ML 도구', 'Google 인프라'],
      cons: ['비싼 네트워크 비용', '제한적 지원'],
      bestFor: 'AI/ML, 데이터 분석'
    },
    {
      name: 'DigitalOcean',
      category: 'developer',
      region: 'global',
      founded: 2011,
      entryPrice: 4.00,
      midPrice: 48,
      datacenters: 15,
      ease: 9,
      performance: 85,
      support: 88,
      pricing: 88,
      features: 78,
      globalReach: 75,
      bandwidth: '무제한',
      pros: ['사용 쉬움', '투명한 가격', '우수한 문서', '24/7 지원'],
      cons: ['제한된 서비스', 'AWS보다 낮은 SLA'],
      bestFor: '스타트업, 중소기업, 개발자'
    },
    {
      name: 'Vultr',
      category: 'developer',
      region: 'global',
      founded: 2014,
      entryPrice: 2.50,
      midPrice: 24,
      datacenters: 32,
      ease: 8,
      performance: 88,
      support: 75,
      pricing: 92,
      features: 75,
      globalReach: 90,
      bandwidth: '무제한',
      pros: ['가장 많은 위치', '저렴한 가격', 'bare metal 옵션', '빠른 배포'],
      cons: ['제한적 지원', '작은 팀 규모'],
      bestFor: '글로벌 저지연, 가격 민감'
    },
    {
      name: 'Linode (Akamai)',
      category: 'developer',
      region: 'global',
      founded: 2003,
      entryPrice: 5.00,
      midPrice: 30,
      datacenters: 11,
      ease: 8,
      performance: 90,
      support: 90,
      pricing: 85,
      features: 80,
      globalReach: 70,
      bandwidth: '무제한',
      pros: ['가성비 최고', '무료 DDoS 방어', '24/7 지원', '안정성'],
      cons: ['NVMe 미지원', 'Akamai 인수 후 불확실'],
      bestFor: '가성비 중시 개발자'
    },
    {
      name: 'Hetzner',
      category: 'budget',
      region: 'europe',
      founded: 1997,
      entryPrice: 4.15,
      midPrice: 11.00,
      datacenters: 4,
      ease: 7,
      performance: 92,
      support: 70,
      pricing: 98,
      features: 70,
      globalReach: 40,
      bandwidth: '월 20TB',
      pros: ['최저가', '뛰어난 성능', 'GDPR 준수', '넉넉한 트래픽'],
      cons: ['유럽 중심', '제한된 지원', '영어 문서 부족'],
      bestFor: 'EU 시장, 가격 최우선'
    },
    {
      name: 'OVHcloud',
      category: 'budget',
      region: 'europe',
      founded: 1999,
      entryPrice: 5.50,
      midPrice: 30,
      datacenters: 33,
      ease: 6,
      performance: 80,
      support: 65,
      pricing: 90,
      features: 82,
      globalReach: 80,
      bandwidth: '무제한',
      pros: ['bare metal 저렴', '무료 DDoS 방어', '데이터 주권'],
      cons: ['다운타임 이력', '복잡한 UI', '지원 품질 낮음'],
      bestFor: 'EU 데이터 주권, bare metal'
    },
    {
      name: 'Cloudways',
      category: 'managed',
      region: 'global',
      founded: 2011,
      entryPrice: 14.00,
      midPrice: 88,
      datacenters: 65,
      ease: 10,
      performance: 90,
      support: 92,
      pricing: 75,
      features: 85,
      globalReach: 95,
      bandwidth: '가변',
      pros: ['완전 관리형', '5개 클라우드 선택', '쉬운 마이그레이션'],
      cons: ['높은 가격', '제공업체에 종속'],
      bestFor: '기술 없는 관리, 대행사'
    },
    {
      name: 'Hostinger VPS',
      category: 'budget',
      region: 'global',
      founded: 2004,
      entryPrice: 5.99,
      midPrice: 23.99,
      datacenters: 7,
      ease: 9,
      performance: 78,
      support: 80,
      pricing: 92,
      features: 70,
      globalReach: 60,
      bandwidth: '무제한',
      pros: ['초보자 친화', '저렴한 가격', '좋은 지원'],
      cons: ['제한된 기능', '낮은 성능'],
      bestFor: '입문자, 소규모 프로젝트'
    },
    {
      name: 'Kamatera',
      category: 'developer',
      region: 'global',
      founded: 1995,
      entryPrice: 4.00,
      midPrice: 20,
      datacenters: 13,
      ease: 7,
      performance: 85,
      support: 88,
      pricing: 95,
      features: 82,
      globalReach: 75,
      bandwidth: '무제한',
      pros: ['초저가', '유연한 커스터마이징', '30일 무료 체험'],
      cons: ['복잡한 설정', '낮은 인지도'],
      bestFor: '커스텀 설정, 예산 제한'
    }
  ];

  // 필터링된 데이터
  const filteredProviders = providers.filter(p => {
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || p.region === selectedRegion || p.region === 'global';
    return categoryMatch && regionMatch;
  });

  // 가격 비교 차트 데이터
  const priceChartData = filteredProviders.map(p => ({
    name: p.name,
    초급: p.entryPrice,
    중급: p.midPrice
  })).sort((a, b) => a.초급 - b.초급);

  // 레이더 차트 데이터 생성 함수
  const getRadarData = (provider) => [
    { subject: '사용성', value: provider.ease * 10, fullMark: 100 },
    { subject: '성능', value: provider.performance, fullMark: 100 },
    { subject: '지원', value: provider.support, fullMark: 100 },
    { subject: '가격', value: provider.pricing, fullMark: 100 },
    { subject: '기능', value: provider.features, fullMark: 100 },
    { subject: '글로벌', value: provider.globalReach, fullMark: 100 }
  ];

  // 카테고리별 색상
  const categoryColors = {
    hyperscaler: '#3b82f6',
    developer: '#10b981',
    budget: '#f59e0b',
    managed: '#8b5cf6'
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        글로벌 클라우드 서버 업체 종합 비교 (2025)
      </h1>
      <p className="text-gray-600 mb-6">AWS, Azure 외 주요 11개 클라우드 제공업체 분석</p>

      {/* 필터 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              카테고리 선택
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">전체</option>
              <option value="hyperscaler">하이퍼스케일러 (AWS, Azure, GCP)</option>
              <option value="developer">개발자 중심 (DigitalOcean, Vultr, Linode)</option>
              <option value="budget">저가형 (Hetzner, OVHcloud, Hostinger)</option>
              <option value="managed">관리형 (Cloudways)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              지역 선택
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">전체</option>
              <option value="global">글로벌</option>
              <option value="europe">유럽 중심</option>
            </select>
          </div>
        </div>
      </div>

      {/* 카테고리 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-800 mb-1">하이퍼스케일러</h3>
          <p className="text-sm text-blue-700">AWS, Azure, GCP 등 대규모 엔터프라이즈용</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-bold text-green-800 mb-1">개발자 중심</h3>
          <p className="text-sm text-green-700">DigitalOcean, Vultr 등 개발자 친화적</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-800 mb-1">저가형</h3>
          <p className="text-sm text-yellow-700">Hetzner, OVHcloud 등 가격 최우선</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-800 mb-1">관리형</h3>
          <p className="text-sm text-purple-700">Cloudways 등 완전 관리 서비스</p>
        </div>
      </div>

      {/* 가격 비교 차트 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">월 가격 비교</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={priceChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: '가격 ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="초급" fill="#10b981" name="엔트리 플랜" />
            <Bar dataKey="중급" fill="#3b82f6" name="중급 플랜" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 상세 비교 테이블 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">상세 스펙 비교</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-3">업체</th>
              <th className="text-left p-3">카테고리</th>
              <th className="text-right p-3">시작 가격</th>
              <th className="text-center p-3">데이터센터</th>
              <th className="text-center p-3">대역폭</th>
              <th className="text-center p-3">사용 편의성</th>
              <th className="text-center p-3">성능</th>
              <th className="text-left p-3">추천 대상</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 font-bold" style={{ color: categoryColors[provider.category] }}>
                  {provider.name}
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs" style={{
                    backgroundColor: `${categoryColors[provider.category]}20`,
                    color: categoryColors[provider.category]
                  }}>
                    {provider.category === 'hyperscaler' ? '하이퍼스케일러' :
                     provider.category === 'developer' ? '개발자 중심' :
                     provider.category === 'budget' ? '저가형' : '관리형'}
                  </span>
                </td>
                <td className="text-right p-3 font-semibold text-green-600">
                  ${provider.entryPrice}/월
                </td>
                <td className="text-center p-3">{provider.datacenters}개</td>
                <td className="text-center p-3 text-sm">{provider.bandwidth}</td>
                <td className="text-center p-3">
                  <div className="flex justify-center">
                    {'⭐'.repeat(Math.round(provider.ease / 2))}
                  </div>
                </td>
                <td className="text-center p-3">
                  <span className={`font-semibold ${
                    provider.performance >= 90 ? 'text-green-600' :
                    provider.performance >= 80 ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {provider.performance}
                  </span>
                </td>
                <td className="p-3 text-sm">{provider.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 개별 업체 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredProviders.map((provider, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold" style={{ color: categoryColors[provider.category] }}>
                {provider.name}
              </h3>
              <span className="text-xs text-gray-500">설립 {provider.founded}</span>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-800 mb-1">
                ${provider.entryPrice}<span className="text-sm text-gray-500">/월~</span>
              </div>
              <div className="text-sm text-gray-600">
                데이터센터: {provider.datacenters}개 | {provider.bandwidth}
              </div>
            </div>

            <div className="mb-4">
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={getRadarData(provider)}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    dataKey="value"
                    stroke={categoryColors[provider.category]}
                    fill={categoryColors[provider.category]}
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-green-700 mb-1">✅ 장점</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                {provider.pros.slice(0, 3).map((pro, i) => (
                  <li key={i}>• {pro}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-red-700 mb-1">❌ 단점</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                {provider.cons.slice(0, 2).map((con, i) => (
                  <li key={i}>• {con}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <span className="text-xs font-semibold text-gray-600">최적 사용:</span>
              <p className="text-xs text-gray-700 mt-1">{provider.bestFor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 추천 매트릭스 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">🎯 상황별 추천 매트릭스</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">💰 최저가 ($2.50-5/월)</h3>
            <p className="text-sm">Vultr, Hetzner, Kamatera</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">🚀 초보자 친화</h3>
            <p className="text-sm">DigitalOcean, Cloudways, Hostinger</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">⚡ 최고 성능</h3>
            <p className="text-sm">Google Cloud, Hetzner, Linode</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">🌍 글로벌 커버리지</h3>
            <p className="text-sm">Azure (60), Vultr (32), AWS (32)</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">🇪🇺 EU 데이터 주권</h3>
            <p className="text-sm">Hetzner, OVHcloud</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">🏢 엔터프라이즈</h3>
            <p className="text-sm">AWS, Azure, Google Cloud</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">👨‍💻 개발자</h3>
            <p className="text-sm">DigitalOcean, Linode, Vultr</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">🛠️ 완전 관리형</h3>
            <p className="text-sm">Cloudways</p>
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">💳 가성비</h3>
            <p className="text-sm">Linode, Hetzner, DigitalOcean</p>
          </div>
        </div>
      </div>

      {/* 웹사이트 호스팅 비용 계산 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💰 30개 웹사이트 호스팅 시 월 비용 비교
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3">업체</th>
                <th className="text-left p-3">추천 플랜</th>
                <th className="text-right p-3">월 비용</th>
                <th className="text-right p-3">사이트당 비용</th>
                <th className="text-center p-3">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-yellow-50">
                <td className="p-3 font-bold">Hetzner</td>
                <td className="p-3">CPX21 (3 vCPU, 4GB)</td>
                <td className="text-right p-3 font-bold text-green-600">€8.99 ($9.50)</td>
                <td className="text-right p-3 font-bold text-green-600">$0.32</td>
                <td className="text-center p-3">🏆 최저가</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-bold">Vultr</td>
                <td className="p-3">4 vCPU, 8GB RAM</td>
                <td className="text-right p-3">$24</td>
                <td className="text-right p-3">$0.80</td>
                <td className="text-center p-3">32개 위치</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-bold">DigitalOcean</td>
                <td className="p-3">Basic 4GB</td>
                <td className="text-right p-3">$28</td>
                <td className="text-right p-3">$0.93</td>
                <td className="text-center p-3">가장 쉬움</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-bold">Linode</td>
                <td className="p-3">4GB Shared</td>
                <td className="text-right p-3">$30</td>
                <td className="text-right p-3">$1.00</td>
                <td className="text-center p-3">무료 DDoS</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-bold">AWS</td>
                <td className="p-3">t3.medium</td>
                <td className="text-right p-3">$30</td>
                <td className="text-right p-3">$1.00</td>
                <td className="text-center p-3">예약 할인 가능</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-bold">OVHcloud</td>
                <td className="p-3">VPS Comfort</td>
                <td className="text-right p-3">$32</td>
                <td className="text-right p-3">$1.07</td>
                <td className="text-center p-3">EU 중심</td>
              </tr>
              <tr className="border-b border-gray-200 bg-red-50">
                <td className="p-3 font-bold">Cloudways</td>
                <td className="p-3">DO 4GB + 관리</td>
                <td className="text-right p-3 font-bold text-red-600">$88</td>
                <td className="text-right p-3 font-bold text-red-600">$2.93</td>
                <td className="text-center p-3">완전 관리형</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          * 중간 트래픽 (월 5K-20K 방문) 기준, 실제 비용은 트래픽과 리소스 사용량에 따라 달라질 수 있습니다.
        </p>
      </div>

      {/* 마이그레이션 가이드 */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
        <h3 className="font-bold text-blue-800 mb-3">🔄 클라우드 간 마이그레이션 팁</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">AWS/Azure → Developer Cloud</h4>
            <ul className="space-y-1">
              <li>• 비용 50-70% 절감 가능</li>
              <li>• DigitalOcean이 가장 쉬운 마이그레이션</li>
              <li>• Cloudways로 관리 부담 제거</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">공유 호스팅 → VPS</h4>
            <ul className="space-y-1">
              <li>• Hostinger VPS로 부드러운 전환</li>
              <li>• DigitalOcean 1-Click Apps 활용</li>
              <li>• 대부분 무료 마이그레이션 지원</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 선택 시 고려사항</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>지역:</strong> 사용자와 가까운 데이터센터 선택이 성능에 결정적</li>
          <li>• <strong>트래픽:</strong> 대역폭 제한 및 초과 비용 확인</li>
          <li>• <strong>백업:</strong> 자동 백업 포함 여부 및 복구 정책</li>
          <li>• <strong>지원:</strong> 24/7 지원 및 응답 시간 (영어/한국어)</li>
          <li>• <strong>확장성:</strong> 성장 시 쉽게 업그레이드 가능한지</li>
          <li>• <strong>SLA:</strong> 업타임 보장 및 보상 정책</li>
        </ul>
      </div>
    </div>
  );
};

export default CloudProvidersComparison;