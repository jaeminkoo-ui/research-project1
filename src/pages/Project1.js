import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIWebsiteBusinessPlan = () => {
  const [selectedPhase, setSelectedPhase] = useState('all');

  // 성장 단계별 데이터
  const phases = [
    {
      name: '6개월',
      period: '0-6개월',
      stage: 'MVP & 초기 검증',
      customers: 15,
      monthlyRevenue: 525,
      costs: 85,
      profit: 440,
      domain: 'Namecheap',
      hosting: 'DigitalOcean',
      setup: '간단',
      automation: 30
    },
    {
      name: '12개월',
      period: '6-12개월',
      stage: '성장 & 확장',
      customers: 35,
      monthlyRevenue: 1400,
      costs: 165,
      profit: 1235,
      domain: 'Namecheap',
      hosting: 'DigitalOcean',
      setup: '자동화 시작',
      automation: 60
    },
    {
      name: '2년',
      period: '12-24개월',
      stage: '스케일업',
      customers: 75,
      monthlyRevenue: 3150,
      costs: 380,
      profit: 2770,
      domain: 'ResellerClub',
      hosting: 'DO + Hetzner',
      setup: '고도 자동화',
      automation: 85
    },
    {
      name: '5년',
      period: '24-60개월',
      stage: '성숙 & 다각화',
      customers: 200,
      monthlyRevenue: 9500,
      costs: 1200,
      profit: 8300,
      domain: 'ResellerClub',
      hosting: 'Multi-cloud',
      setup: '완전 자동화',
      automation: 95
    }
  ];

  // 누적 성장 차트 데이터
  const growthData = [
    { month: '1M', customers: 3, revenue: 105, profit: 85 },
    { month: '2M', customers: 6, revenue: 210, profit: 180 },
    { month: '3M', customers: 9, revenue: 315, profit: 275 },
    { month: '6M', customers: 15, revenue: 525, profit: 440 },
    { month: '9M', customers: 25, revenue: 1000, profit: 850 },
    { month: '12M', customers: 35, revenue: 1400, profit: 1235 },
    { month: '18M', customers: 55, revenue: 2310, profit: 2000 },
    { month: '24M', customers: 75, revenue: 3150, profit: 2770 },
    { month: '36M', customers: 120, revenue: 5400, profit: 4800 },
    { month: '48M', customers: 160, revenue: 7360, profit: 6500 },
    { month: '60M', customers: 200, revenue: 9500, profit: 8300 }
  ];

  // 도메인 리셀러 비교
  const domainResellers = [
    {
      name: 'Namecheap',
      startup: 0,
      comWholesale: 8.88,
      comRetail: 15,
      margin: 6.12,
      features: ['무료 가입', 'WHOIS 무료', '24/7 지원', 'API 우수'],
      phase: '0-12개월',
      score: 9.2,
      pros: ['진입장벽 없음', '투명한 가격', '좋은 API'],
      cons: ['대량 할인 제한적', '예치금 필요']
    },
    {
      name: 'ResellerClub',
      startup: 0,
      comWholesale: 8.24,
      comRetail: 15,
      margin: 6.76,
      features: ['무료 가입', '1000+ TLD', '화이트라벨', 'API 완벽'],
      phase: '12개월+',
      score: 9.5,
      pros: ['최저 도매가', '대량 할인', '전문 리셀러용'],
      cons: ['초기 학습곡선', '최소 주문 없음']
    },
    {
      name: 'GoDaddy Reseller',
      startup: 120,
      comWholesale: 7.99,
      comRetail: 15,
      margin: 7.01,
      features: ['브랜드 파워', '통합 서비스', '마케팅 지원'],
      phase: '24개월+',
      score: 8.5,
      pros: ['최저 도매가', '브랜드 신뢰', '대량 할인 우수'],
      cons: ['월 $10 요금', '초기 투자 필요']
    }
  ];

  // 호스팅 솔루션 비교
  const hostingSolutions = [
    {
      name: 'DigitalOcean',
      phase: '0-12개월',
      plan: 'Droplet 4GB',
      price: 28,
      maxSites: 30,
      costPerSite: 0.93,
      ease: 10,
      performance: 8.5,
      support: 9,
      score: 9.3,
      pros: ['가장 쉬움', '훌륭한 문서', '24/7 지원', '예측 가능한 비용'],
      cons: ['중간 가격', '유럽 속도'],
      features: ['원클릭 앱', 'API/CLI', '자동 백업', '방화벽']
    },
    {
      name: 'Hetzner',
      phase: '12-24개월',
      plan: 'CPX31',
      price: 14,
      maxSites: 50,
      costPerSite: 0.28,
      ease: 7,
      performance: 9.2,
      support: 7,
      score: 8.8,
      pros: ['최저가', '최고 성능', '20TB 트래픽', 'GDPR'],
      cons: ['EU 중심', '지원 제한', '영어만'],
      features: ['고성능 CPU', '넉넉한 대역폭', 'DDoS 보호']
    },
    {
      name: 'Hybrid (DO + Hetzner)',
      phase: '24-60개월',
      plan: 'DO 4GB + Hetzner CPX31',
      price: 42,
      maxSites: 80,
      costPerSite: 0.53,
      ease: 8,
      performance: 9.0,
      support: 9,
      score: 9.5,
      pros: ['최적 비용', '리스크 분산', '지역별 최적화'],
      cons: ['관리 복잡', '두 플랫폼 학습'],
      features: ['멀티 클라우드', '로드 밸런싱', '지역별 배치']
    },
    {
      name: 'Multi-cloud + CDN',
      phase: '60개월+',
      plan: 'DO + Hetzner + Cloudflare',
      price: 95,
      maxSites: 200,
      costPerSite: 0.48,
      ease: 6,
      performance: 9.8,
      support: 9,
      score: 9.8,
      pros: ['최고 안정성', '글로벌 성능', '무한 확장'],
      cons: ['높은 복잡도', '전문 지식 필요'],
      features: ['글로벌 CDN', '자동 failover', '지능형 라우팅']
    }
  ];

  // 단계별 상세 계획
  const detailedPhases = [
    {
      phase: '6개월',
      title: 'MVP 구축 & 첫 고객',
      goals: [
        '첫 15명 고객 확보',
        'AI 워크플로우 완성',
        '월 $500 수익 달성',
        '핵심 프로세스 검증'
      ],
      tech: {
        domain: 'Namecheap 무료 리셀러',
        hosting: 'DigitalOcean Droplet $28',
        tools: ['v0.dev', 'Cursor', 'ChatGPT', 'GitHub'],
        automation: '30% (수동 + 템플릿)'
      },
      costs: {
        hosting: 28,
        domain: 15,
        tools: 40,
        total: 83
      },
      revenue: {
        avg: 35,
        customers: 15,
        total: 525,
        profit: 442
      },
      actions: [
        '✅ 1주: DigitalOcean 계정 + Namecheap 리셀러 가입',
        '✅ 2주: v0.dev로 5개 템플릿 제작',
        '✅ 3주: 첫 3명 베타 고객 (친구/지인)',
        '✅ 1개월: 랜딩 페이지 제작 + SEO',
        '✅ 2개월: 소셜 미디어 마케팅 시작',
        '✅ 3개월: 10명 고객 달성',
        '✅ 6개월: 프로세스 문서화 완료'
      ]
    },
    {
      phase: '12개월',
      title: '성장 & 자동화',
      goals: [
        '35명 고객으로 성장',
        '월 $1,400 수익',
        '워크플로우 60% 자동화',
        '추천 시스템 구축'
      ],
      tech: {
        domain: 'Namecheap (볼륨 증가)',
        hosting: 'DigitalOcean Droplet $48 (업그레이드)',
        tools: ['Make.com', 'Zapier', 'Airtable', 'Stripe'],
        automation: '60% (반자동화)'
      },
      costs: {
        hosting: 48,
        domain: 30,
        tools: 80,
        total: 158
      },
      revenue: {
        avg: 40,
        customers: 35,
        total: 1400,
        profit: 1242
      },
      actions: [
        '✅ 7개월: Make.com으로 자동 배포 구축',
        '✅ 8개월: 고객 온보딩 자동화',
        '✅ 9개월: 월간 리포트 자동 생성',
        '✅ 10개월: 추천 프로그램 런칭',
        '✅ 11개월: SEO 서비스 추가 ($10/월)',
        '✅ 12개월: 첫 파트타임 VA 고용 고려'
      ]
    },
    {
      phase: '2년',
      title: '스케일업 & 최적화',
      goals: [
        '75명 고객',
        '월 $3,150 수익',
        '85% 자동화',
        'Hetzner 통합으로 비용 50% 절감'
      ],
      tech: {
        domain: 'ResellerClub (최저가)',
        hosting: 'DigitalOcean $48 + Hetzner $14',
        tools: ['커스텀 대시보드', 'n8n', 'PostgreSQL'],
        automation: '85% (고도 자동화)'
      },
      costs: {
        hosting: 62,
        domain: 60,
        tools: 150,
        va: 500,
        total: 772
      },
      revenue: {
        avg: 42,
        customers: 75,
        total: 3150,
        profit: 2378
      },
      actions: [
        '✅ 13개월: Hetzner 계정 개설 + 마이그레이션',
        '✅ 15개월: 커스텀 클라이언트 포털 개발',
        '✅ 18개월: 프리미엄 패키지 출시 ($75/월)',
        '✅ 20개월: 전임 VA 또는 개발자 고용',
        '✅ 22개월: ResellerClub 전환 (마진 증가)',
        '✅ 24개월: 월 $3K 돌파 축하! 🎉'
      ]
    },
    {
      phase: '5년',
      title: '성숙 & 확장',
      goals: [
        '200명 고객',
        '월 $9,500 수익',
        '95% 자동화',
        '대행사로 전환'
      ],
      tech: {
        domain: 'ResellerClub Enterprise',
        hosting: 'Multi-cloud + CDN',
        tools: ['커스텀 플랫폼', 'AI 자동화', 'CRM'],
        automation: '95% (거의 완전 자동화)'
      },
      costs: {
        hosting: 200,
        domain: 150,
        tools: 300,
        team: 3000,
        total: 3650
      },
      revenue: {
        avg: 47.5,
        customers: 200,
        total: 9500,
        profit: 5850
      },
      actions: [
        '✅ 25개월: 팀 확장 (2-3명)',
        '✅ 30개월: 화이트라벨 솔루션 개발',
        '✅ 36개월: 엔터프라이즈 고객 진출',
        '✅ 42개월: SaaS 플랫폼 출시 고려',
        '✅ 48개월: 파트너십/리셀러 프로그램',
        '✅ 60개월: Exit 또는 계속 확장'
      ]
    }
  ];

  // 필터링된 데이터
  const filteredPhases = selectedPhase === 'all' 
    ? detailedPhases 
    : detailedPhases.filter(p => p.phase === selectedPhase);

  // 비용 구조 차트 데이터
  const costBreakdown = phases.map(p => ({
    name: p.name,
    수익: p.monthlyRevenue,
    비용: p.costs,
    순이익: p.profit
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        AI 웹사이트 제작 사업 종합 전략
      </h1>
      <p className="text-gray-600 mb-6">
        도메인 리셀러 + 클라우드 호스팅 최적 조합 분석 & 5년 로드맵
      </p>

      {/* 성장 요약 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">🚀 5년 성장 시뮬레이션</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {phases.map((phase, idx) => (
            <div key={idx} className="bg-white bg-opacity-20 p-4 rounded">
              <div className="text-sm mb-1">{phase.name}</div>
              <div className="text-2xl font-bold">{phase.customers}명</div>
              <div className="text-sm">${phase.monthlyRevenue}/월</div>
              <div className="text-xs mt-1">순익: ${phase.profit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 성장 차트 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📈 고객 수 & 수익 성장 추이
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} name="고객 수" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="월 수익 ($)" />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="순이익 ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 수익 구조 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💰 단계별 수익 구조
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="수익" fill="#10b981" />
            <Bar dataKey="비용" fill="#ef4444" />
            <Bar dataKey="순이익" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 도메인 리셀러 비교 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🌐 도메인 리셀러 추천 (단계별)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {domainResellers.map((reseller, idx) => (
            <div key={idx} className={`border-2 rounded-lg p-5 ${
              idx === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">{reseller.name}</h3>
                {idx === 1 && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">추천</span>}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">초기 비용:</span>
                  <span className="font-semibold">${reseller.startup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">도매가 (.com):</span>
                  <span className="font-semibold text-green-600">${reseller.comWholesale}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">판매가:</span>
                  <span className="font-semibold">${reseller.comRetail}</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-gray-600">마진:</span>
                  <span className="font-bold text-blue-600">${reseller.margin}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-600 mb-2">권장 시기</div>
                <div className="text-sm font-semibold text-purple-600">{reseller.phase}</div>
              </div>

              <div className="mb-3">
                <div className="text-xs font-semibold text-green-700 mb-1">✅ 장점</div>
                <ul className="text-xs text-gray-700 space-y-1">
                  {reseller.pros.map((pro, i) => (
                    <li key={i}>• {pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold text-red-700 mb-1">❌ 단점</div>
                <ul className="text-xs text-gray-700 space-y-1">
                  {reseller.cons.map((con, i) => (
                    <li key={i}>• {con}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">종합 점수</span>
                  <span className="text-lg font-bold text-yellow-600">{reseller.score}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">💡 추천 전략</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>0-6개월:</strong> Namecheap으로 시작 (진입장벽 없음)</li>
            <li>• <strong>6-12개월:</strong> Namecheap 유지 (충분한 기능)</li>
            <li>• <strong>12개월+:</strong> ResellerClub 전환 (최저 도매가, 마진 최대화)</li>
            <li>• <strong>100개+ 고객:</strong> GoDaddy 고려 (대량 할인 극대화)</li>
          </ul>
        </div>
      </div>

      {/* 호스팅 솔루션 비교 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ☁️ 클라우드 호스팅 추천 (단계별)
        </h2>
        
        <div className="space-y-4">
          {hostingSolutions.map((solution, idx) => (
            <div key={idx} className={`border-2 rounded-lg p-5 ${
              idx === 0 ? 'border-green-500 bg-green-50' : 
              idx === 2 ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{solution.name}</h3>
                    {idx === 0 && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">시작</span>}
                    {idx === 2 && <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">확장</span>}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{solution.plan}</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">월 비용:</span>
                      <span className="text-xl font-bold text-green-600">${solution.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">최대 사이트:</span>
                      <span className="font-semibold">{solution.maxSites}개</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-gray-600">사이트당:</span>
                      <span className="font-bold text-blue-600">${solution.costPerSite}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-gray-600 mb-1">권장 시기</div>
                    <div className="text-sm font-semibold text-purple-600">{solution.phase}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-green-700 mb-1">✅ 장점</div>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {solution.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-red-700 mb-1">❌ 단점</div>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {solution.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-600 mb-2">평가</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">사용 편의성</span>
                        <div className="flex">
                          {'⭐'.repeat(Math.round(solution.ease / 2))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">성능</span>
                        <span className="text-sm font-semibold">{solution.performance}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">지원</span>
                        <span className="text-sm font-semibold">{solution.support}/10</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">종합 점수</span>
                      <span className="text-xl font-bold text-yellow-600">{solution.score}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">🎯 최적 호스팅 전략</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>0-12개월:</strong> DigitalOcean 단독 (학습 쉬움, 문서 완벽)</li>
            <li>• <strong>12-24개월:</strong> Hetzner 추가 (비용 50% 절감)</li>
            <li>• <strong>24-36개월:</strong> Hybrid (DO + Hetzner) + Cloudflare CDN</li>
            <li>• <strong>36개월+:</strong> Multi-cloud + 로드밸런서 (안정성 극대화)</li>
          </ul>
        </div>
      </div>

      {/* 단계별 선택 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📅 단계별 상세 실행 계획
        </h2>
        
        <div className="mb-4">
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="all">전체 보기</option>
            <option value="6개월">6개월 - MVP & 검증</option>
            <option value="12개월">12개월 - 성장 & 자동화</option>
            <option value="2년">2년 - 스케일업</option>
            <option value="5년">5년 - 성숙 & 확장</option>
          </select>
        </div>

        {filteredPhases.map((phase, idx) => (
          <div key={idx} className="mb-8 border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-gray-800">{phase.phase}</h3>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {phase.title}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">🎯 주요 목표</h4>
                <ul className="space-y-2">
                  {phase.goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">🛠️ 기술 스택</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="text-gray-600">도메인:</span>
                    <span className="font-semibold">{phase.tech.domain}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="text-gray-600">호스팅:</span>
                    <span className="font-semibold">{phase.tech.hosting}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="text-gray-600">자동화:</span>
                    <span className="font-semibold text-purple-600">{phase.tech.automation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-800 mb-3">💸 월간 비용</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(phase.costs).map(([key, value], i) => (
                    key !== 'total' && (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-700 capitalize">{key}:</span>
                        <span className="font-semibold">${value}</span>
                      </div>
                    )
                  ))}
                  <div className="flex justify-between pt-2 border-t-2 border-red-200">
                    <span className="font-bold text-gray-800">총 비용:</span>
                    <span className="text-xl font-bold text-red-600">${phase.costs.total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-800 mb-3">💰 월간 수익</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">평균 단가:</span>
                    <span className="font-semibold">${phase.revenue.avg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">고객 수:</span>
                    <span className="font-semibold">{phase.revenue.customers}명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">총 수익:</span>
                    <span className="font-semibold">${phase.revenue.total}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-green-200">
                    <span className="font-bold text-gray-800">순이익:</span>
                    <span className="text-xl font-bold text-green-600">${phase.revenue.profit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3">📋 실행 체크리스트</h4>
              <div className="space-y-2">
                {phase.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-white rounded">
                    <span className="text-blue-500 mt-1">{action.substring(0, 2)}</span>
                    <span className="text-gray-700 text-sm">{action.substring(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 핵심 성공 요인 */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">🔑 핵심 성공 요인 (CSF)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">1️⃣ 비용 최적화</h3>
            <ul className="text-sm space-y-1">
              <li>• 초기: DigitalOcean (단순함)</li>
              <li>• 성장기: Hetzner 추가 (50% 절감)</li>
              <li>• 도메인: ResellerClub ($0.64 추가 마진/개)</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">2️⃣ 자동화</h3>
            <ul className="text-sm space-y-1">
              <li>• 6M: 30% (템플릿)</li>
              <li>• 12M: 60% (Make.com/Zapier)</li>
              <li>• 24M: 85% (커스텀 도구)</li>
              <li>• 60M: 95% (AI + 플랫폼)</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">3️⃣ 고객 유지</h3>
            <ul className="text-sm space-y-1">
              <li>• 월간 리포트 자동 발송</li>
              <li>• 프로액티브 업데이트</li>
              <li>• 24시간 응답 보장</li>
              <li>• 추천 인센티브</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-20 p-4 rounded">
            <h3 className="font-bold mb-2">4️⃣ 확장성</h3>
            <ul className="text-sm space-y-1">
              <li>• Hybrid cloud (리스크 분산)</li>
              <li>• API 우선 설계</li>
              <li>• 프로세스 문서화</li>
              <li>• 팀 빌딩 (VA → 개발자)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 최종 추천 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🏆 최종 추천 조합
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-bold text-green-700 mb-2">Phase 1: 시작 (0-6개월)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">도메인</div>
                <div className="text-blue-600">Namecheap 리셀러</div>
                <div className="text-xs text-gray-600 mt-1">무료, 즉시 시작</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">호스팅</div>
                <div className="text-blue-600">DigitalOcean $28/월</div>
                <div className="text-xs text-gray-600 mt-1">30개 사이트</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">총 비용</div>
                <div className="text-green-600 text-lg">$85/월</div>
                <div className="text-xs text-gray-600 mt-1">15명 → $440 순익</div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-bold text-blue-700 mb-2">Phase 2: 성장 (6-24개월)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">도메인</div>
                <div className="text-blue-600">ResellerClub</div>
                <div className="text-xs text-gray-600 mt-1">최저 도매가</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">호스팅</div>
                <div className="text-blue-600">DO $48 + Hetzner $14</div>
                <div className="text-xs text-gray-600 mt-1">80개 사이트</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">총 비용</div>
                <div className="text-green-600 text-lg">$165/월</div>
                <div className="text-xs text-gray-600 mt-1">35명 → $1,235 순익</div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-bold text-purple-700 mb-2">Phase 3: 확장 (24-60개월)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">도메인</div>
                <div className="text-blue-600">ResellerClub Enterprise</div>
                <div className="text-xs text-gray-600 mt-1">대량 할인</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">호스팅</div>
                <div className="text-blue-600">Multi-cloud + CDN</div>
                <div className="text-xs text-gray-600 mt-1">200개 사이트</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold mb-1">총 비용</div>
                <div className="text-green-600 text-lg">$1,200/월</div>
                <div className="text-xs text-gray-600 mt-1">200명 → $8,300 순익</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <h4 className="font-bold text-yellow-800 mb-2">💎 성공의 비밀</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            이 조합의 핵심은 <strong>단계적 진화</strong>입니다. 처음부터 복잡한 멀티 클라우드를 구축하지 않고, 
            DigitalOcean의 단순함으로 시작해 비즈니스를 검증한 후, Hetzner로 비용을 절감하고, 
            최종적으로 multi-cloud로 안정성을 극대화합니다. 도메인도 동일한 전략으로 Namecheap에서 
            ResellerClub으로 진화하며 마진을 높입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIWebsiteBusinessPlan;