import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import styles from './Home.module.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Filler, Legend)

const visitorData = {
  week1: { title: '3주 전', visitors: [120, 150, 170, 300, 250, 394, 450] },
  week2: { title: '2주 전', visitors: [220, 300, 150, 276, 100, 480, 364] },
  week3: { title: '이번 주', visitors: [123, 412, 240, 334, 156, 447] },
}

const getDates = (week, count) => {
  const today = new Date()
  const weekGap = week === 'week1' ? 14 : week === 'week2' ? 7 : 0

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (count - 1 - index) - weekGap)
    return `${date.getMonth() + 1}/${date.getDate()}`
  })
}

const chartAnimation = {
  duration: 1400,
  easing: 'easeOutQuart',
  animateRotate: true,
  animateScale: true,
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: chartAnimation,
  plugins: {
    legend: { display: false },
    tooltip: {
  displayColors: false,
  backgroundColor: '#ffffff', // 박스 배경색
  titleColor: '#111827',      // 위 숫자 색
  bodyColor: '#111827',       // 아래 방문자 수 색
  borderWidth: 1,
  borderColor: '#d1d5db',
  padding: 12,
},
  },
  scales: {
    x: { grid: { display: false },
     border: { display: true, color: '#d1d5db' },
      ticks: { display: true, color: '#64748b',
         font: { size: 13, weight: '500' }, padding: 12 }
         },
    y: { beginAtZero: true,
       border: { display: true, color: '#d1d5db' },
        grid: { color: '#2222' },
         ticks: { display: true, color: '#64748b',
           font: { size: 13 },
            padding: 10 }
           },
  },
}
// 원그래프 시작점
const categoryData = {
  labels: ['에세이', '소설', '인문', '자기계발', '경제'],
  datasets: [{
    data: [32, 21, 18, 17, 12],
    backgroundColor: ['orange','rgb(23, 51, 180)', '#7c8cf0', '#aeb8f7', '#d9defb'],
    hoverOffset: 14,

  }],
}
// borderColor: 'none',
    // borderWidth: 1,
    // hoverOffset:,
//원그래프 시작점2
const categoryOption = {
  responsive: true,
  maintainAspectRatio: false,

  animation: chartAnimation,

  cutout: '50%',

  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#333',
        font: { size: 12 },
      },
    },

    tooltip: {
      displayColors: false,
      backgroundColor: '#ffffff',
      titleColor: '#111827',
      bodyColor: '#111827',
      borderWidth: 1,
      borderColor: '#d1d5db',
      padding: 12,
    },
  },
}
// 원그래프가 시작------------------------------------
const diviceData={
  labels: ['PC', '태블릿', '모바일'],
  datasets:[
    {
      data:[31, 11, 58],
      backgroundColor:[
        'orange','rgb(23, 51, 180)', '#7c8cf0'
      ],
      borderColor:'white',

    }
  ]
}
const diviceOption={
   responsive: true,
  maintainAspectRatio: false,
  plugins:{
    legend:{
      display: true,
      position: 'right',
       labels: {
        padding: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#333',
        font: { size: 12 },
      },
    },
    tooltip: {
  displayColors: false,
  backgroundColor: '#ffffff', // 박스 배경색
  titleColor: '#111827',      // 위 숫자 색
  bodyColor: '#111827',       // 아래 방문자 수 색
  borderWidth: 1,
  borderColor: '#d1d5db',
  padding: 12,
},
  },
  
  animation: {
    duration: 1400,
    easing: 'easeOutQuart',
    animateRotate: true,
    animateScale: true,
  },
}
const timeData={
  labels: ['00~03시', '03~06시', '06~09시', '09~12시', '12시~15시', '15시~18시', '18시~21시', '21시~24시'],
  datasets:[
    {
      data:[31, 11, 58, 12, 5, 56, 64, 80],
      backgroundColor:[
        '#7c8cf0','#7c8cf0','#7c8cf0','#7c8cf0','#7c8cf0','#7c8cf0','#7c8cf0','orange'
      ],
      borderRadius: {
  topLeft: 8,
  topRight: 10,
  bottomLeft: 0,
  bottomRight: 0,
},
borderSkipped: false,
    }
    
  ]
}

const timeOption = {
  responsive: true,
  maintainAspectRatio: false,
  animation: chartAnimation,
  plugins: { legend: { display: false },
tooltip: {
  displayColors: false,
  backgroundColor: '#ffffff', // 박스 배경색
  titleColor: '#111827',      // 위 숫자 색
  bodyColor: '#111827',       // 아래 방문자 수 색
  borderWidth: 1,
  borderColor: '#d1d5db',
  padding: 12,
},},
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
}

const ChartOnView = ({ className, children }) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : null}
    </div>
  )
}
// 전체 그래프 애니메니션 제어
const Home = () => {
  const [selectWeek, setSelectWeek] = useState('week3')
  const currentData = visitorData[selectWeek]
  const chartData = {
    labels: getDates(selectWeek, currentData.visitors.length),
    datasets: [{
      label: '방문자 수',tension: 0.2, // 추가: 0이면 직선, 숫자가 클수록 부드러운 곡선,
      data: currentData.visitors, borderColor: 'rgb(64, 94, 228)', borderWidth: 3,
      fill: true, pointRadius: 6, 
      backgroundColor:'rgba(64, 94, 228, 0.2)',pointBackgroundColor:'yellow', pointHoverRadius: 8, pointBorderColor: 'rgb(64, 94, 228)', pointBorderWidth: 4,
    }],
  }

  return (
    <>
      <Helmet>
        <title>대시보드 | 온라인 출판 관리자</title>
        <meta name="description" content="온라인 출판 서비스 관리자 대시보드" />
      </Helmet>
      <div>
        <h2 className={styles.maintitle}>대시보드</h2>
        <p  className={styles.smalltitle} >온라인 출판 서비스 이용 현황</p>
        <div className={styles.wrapBox}>
        <section className={styles.chartBox}>
          <div>
            <h3>이용 현황</h3>
            <p>{currentData.title} 방문자 수</p>
          </div>
            <div className={styles.btnBox}>
  <button
    className={`${styles.btn1} ${
      selectWeek === 'week1' ? styles.active : ''
    }`}
    onClick={() => setSelectWeek('week1')}
  >
    3주 전
  </button>

  <button
    className={`${styles.btn1} ${
      selectWeek === 'week2' ? styles.active : ''
    }`}
    onClick={() => setSelectWeek('week2')}
  >
    2주 전
  </button>

  <button
    className={`${styles.btn1} ${
      selectWeek === 'week3' ? styles.active : ''
    }`}
    onClick={() => setSelectWeek('week3')}
  >
    이번 주
  </button>
</div>
            <div className={styles.mainCanvas}>
            <Line data={chartData} options={chartOptions} />

        
          </div>
        
        </section>
          {/* 도넛그래프 */}
        <section className={styles.overviewChart}>
          <Doughnut  data={categoryData} options={categoryOption}/>
        </section>
    </div>
        
      </div>
{/* 원그래프시작----------------------------------------------- */}
      <section className={styles.detailCharts}>
        <article className={styles.detailChart}>
        <div>
          <h2>접속디바이브 현황</h2>
          <p className={styles.smalltt}>접속디바이브 현황입니다</p>
        </div>

        <ChartOnView className={styles.pieCanvas}>
          <Pie data={diviceData} options={diviceOption}/>
        </ChartOnView>
        </article>

        <article className={styles.detailChart}>
          <div>
          <h2>시간대별 현황입니다</h2>
          <p className={styles.smalltt}>일 시간대별 현황입니다</p>
        </div>
          <ChartOnView className={styles.barCanvas}>
            <Bar data={timeData} options={timeOption}/>
          </ChartOnView>
        </article>

      </section>
    </>
  )
}

export default Home
