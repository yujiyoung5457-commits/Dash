import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ArcElement, BarElement, CategoryScale, Chart as
     ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip,
     animator,
     scales} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Visitor.module.scss'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Filler, Legend
)

const Visitor = () => {

    const [trafficData, setTrafficData]=useState([
        {name:'검색',value:42, },
        {name:'직접방문',value:22, },
        {name:'SNS',value:82, },
        {name:'외부링트',value:10, },
    ])

    const refreshFunc=()=>{
        setTrafficData(
            (preData)=>{

                return preData.map((item)=>{
                    const changeNumber=Math.floor(Math.random()*11)-5
                    let newValue=item.value+changeNumber
                    if(newValue>80){
                        newValue=80
                    }
                    return{
                        ...item,
                        value:newValue
                    }
                })
            }
        )
    }

    const linedata={
        labels:['월','화','수','목','금','토','일'],
        datasets: [
            //왼쪽 y축을 먼저 만들기
            {
                label:'평균체류시간',
                data:[152, 423, 764, 1237, 645, 458, 546],
                borderColor: 'rgb(23, 51, 180)',
                backgroundColor:'rgba(23, 51, 180, 0.3)',
                borderWidth:4,
                tension:0.2,
                fill:true,
                pointBackgroundColor:'yellow',
                pointHoverRadius: 8,
                pointBorderColor: 'rgb(64, 94, 228)',
                pointBorderWidth: 4,
                yAxisID:'y1'
            
            },

            //오른쪽 y축도 만들기
            {
                label:'평균체류시간',
                data:[4.5, 2.3, 1.2, 6.5, 5.5, 3.3, 3.8],
                borderColor: 'orange',
                backgroundColor:'rgba(255, 217, 0, 0.3)',
                borderWidth:4,
                tension:0.2,
                fill:true,
                pointBackgroundColor:'yellow',
                pointHoverRadius: 8,
                pointBorderColor: 'rgb(64, 94, 228)',
                pointBorderWidth: 4,
                yAxisID:'y2'
            }
        ]   
    }

    const lineopion={
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
             legend: { display: false },
             tooltip:{
                padding: 12,
             }
        },
        scales:{
            //x축부터 시닥---------------
            x:{
                grid:{
                    display:false,
                },
                border:{
                    display:false,
                }
            },
            y1:{
                type:'linear',
                position:'left',
                beginAtZero:true,

                title:{
                    display:true,
                    text:'방문자 수'
                }
            },
            y2:{
                type:'linear',
                position:'right',
                beginAtZero:true,

                title:{
                    display:true,
                    text:'체류시간(분)'
                }
            }
        }
    }


    const barData={
        labels:['월','화','수','목','금','토','일'],
        datasets: [
            //왼쪽 y축을 먼저 만들기
            {
                label:'PC',
                data:[245, 324, 452, 125, 412, 500, 156],
                backgroundColor:'rgb(64, 94, 228)',
                borderRadius:7,
                borderSkipped:false,
                barPercentage:.72,
                categoryPercentage:.72,

            },
            {
                 label:'모바일 ',
                data:[423, 500, 345, 465, 265, 399, 485],
                backgroundColor:'orange',
                borderRadius:7,
                borderSkipped:false,
                barPercentage:.72,
                categoryPercentage:.72,
            }
        ]
    }

    const barOption={
        responsive: true,
        maintainAspectRatio: false,
        animation:{
            duration: 800,
        },
        plugins: {
              legend: { display: true,
                 position:'top',
                 align: 'end',
                 labels:{
                    usePointStyle: true,
                    pointStyle:'circle',
                    padding: 20,

                }
              },
             tooltip:{
                padding: 12,
             },
         },
         scales:{
            x:{ grid:{ display:false }, border:{ display:false } },
            y:{
              beginAtZero:true,
              grid:{ color:'#eeeaf8' },
              border:{ display:false },
              ticks:{ stepSize:100, color:'#6b7280' },
            },
         },
    }

    const rankingData = [
    {
      rank: 1,
      id: 'book_user01',
      name: '김민준',
      nickname: '책벌레민준',
      email: 'minjun@example.com',
      joinDate: '2026.02.12',
      lastVisit: '2026.08.20',
      visits: 38,
    },

    {
      rank: 2,
      id: 'reader_072',
      name: '이서윤',
      nickname: '서윤책방',
      email: 'seoyun@example.com',
      joinDate: '2026.03.05',
      lastVisit: '2026.08.20',
      visits: 34,
    },

    {
      rank: 3,
      id: 'jh_book',
      name: '박지훈',
      nickname: '오늘도독서',
      email: 'jihoon@example.com',
      joinDate: '2026.01.24',
      lastVisit: '2026.08.19',
      visits: 31,
    },

    {
      rank: 4,
      id: 'yujin88',
      name: '최유진',
      nickname: '유진리더',
      email: 'yujin@example.com',
      joinDate: '2026.04.02',
      lastVisit: '2026.08.19',
      visits: 28,
    },

    {
      rank: 5,
      id: 'hw_book23',
      name: '정현우',
      nickname: '현우의서재',
      email: 'hyunwoo@example.com',
      joinDate: '2026.05.18',
      lastVisit: '2026.08.18',
      visits: 24,
    },

    {
      rank: 6,
      id: 'jimin_reader',
      name: '한지민',
      nickname: '책읽는지민',
      email: 'jimin@example.com',
      joinDate: '2026.02.26',
      lastVisit: '2026.08.18',
      visits: 21,
    },

    {
      rank: 7,
      id: 'dohyun77',
      name: '윤도현',
      nickname: '도현북스',
      email: 'dohyun@example.com',
      joinDate: '2026.06.01',
      lastVisit: '2026.08.17',
      visits: 19,
    },
  ]
  const userClickFunc=(e)=>{
    const detail=e.currentTarget.nextElementSibling

    const isOpen=detail.dataset.open==='true'
    //모두 닫아버리기
    document.querySelectorAll('[data-accordion-detail]').forEach((item)=>{
        item.dataset.open='false'
        gsap.to(item,{
            height:0,

            opacity:0,
            paddingTop:0,
            paddingBottom:0,
            marginTop:0,
            marginBottom:0,
            duration: 0.5,
            ease: 'power2.inOut'
                })
    })

    if(isOpen) {return}


    detail.dataset.open='true'
    gsap.to(detail,{
        height:'auto',
        opacity:1,
        paddingTop:15,
            paddingBottom:15,
            marginBottom: 15,
            duration: 0.5,
            ease: 'power2.inOut'
    })
  }
  return (
    <div className={styles.Visitor}>
        <Helmet>
            <title>방문분석 | 관리자</title>
        </Helmet>


        <div className={styles.pageTitle}>
            <h2 className={styles.mainTitle}>방문분석 </h2>
            <p className={styles.pi}>사이트 방문 현황과 사용자들의 사용내역을 확인합니다</p>
        </div>

    <section className={styles.wrap}>
        <div>
        <div className={styles.topLine}>
            <section>
                <div className={styles.sectionTitle}>
                    <div>
                        <h3>디바이스별 방문자</h3>
                        <p className={styles.small}>전체 방문 중 유입 경로 비율</p>
                    </div>
                    <button className={styles.btn} onClick={refreshFunc}> 새로고침</button>
                </div>

                <div className={styles.progreslist}>
                    {
                        trafficData.map((item)=>(
                            <div key={item.name}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <span>{item.value}%</span>
                                </div>
                                <progress value={item.value} max="100"/>
                            </div>
                        ))
                    }
                </div>
                
            </section>
                     <section className={styles.lineChart}>
                        <h3>주간방문 분석</h3>
                        <p className={styles.small}>방문자수와 평균체류 시간 비교</p>
                     <div className={styles.chartCanvas}>
                        <Line data={linedata} options={lineopion}/>
                     </div>
                     </section>
         </div>
           
        </div>

        </section>
     {/* 막대그래프------------------------------------------ */}
        <div className={styles.bottomLine}>
            <section>
                <div className={styles.secTitle}>
                    <h3>디바이스별 방문자</h3>
                    <p>요일별 PC/모바일 방문자 비교</p>
                </div>
                    {/* 그래프 시작 */}
                <div className={styles.barCanvas}>
                    <Bar data={barData} options={barOption} />
                </div>
            </section>
           
        </div>
        {/* 최종 div----------------------- */}
        <div className={styles.end}>
            <section>
                <div>
                    <h3>방문 TOP 5</h3>
                    <p>방문횟수가 많은 사용자 입니다.</p>
                </div>

                    <div className={styles.rankingList}>
                        {/* 랭킹리스트 end------------------ */}
                        {
                            rankingData.slice(0,5).map((item)=>{
                                return (
                                <div className={styles.rankingItem} key={item.id}>
                                    {/* 리턴의 안쪽--------- */}
                                    <button onClick={userClickFunc}>
                                        <span>{item.rank}</span>
                                        <span>{item.id}</span>
                                        <span>{item.visits}회</span>
                                        <span>▼</span>
                                    </button>
                                    <div data-accordion-detail data-open="false">
                                    <dl>
                                        <div>
                                            <dt>이름:</dt>
                                            <dd>{item.name}</dd>
                                        </div>
                                        <div>
                                            <dt>닉네임:</dt>
                                            <dd>{item.nickname}</dd>
                                        </div>
                                        <div>
                                            <dt>이메일:</dt>
                                            <dd>{item.email}</dd>
                                        </div>
                                        <div>
                                            <dt>가입일:</dt>
                                            <dd>{item.joinDate}</dd>
                                        </div>
                                        <div>
                                            <dt>마지막 방문일:</dt>
                                            <dd>{item.lastVisit}</dd>
                                        </div>
                                         <div>
                                            <dt>총 방문일:</dt>
                                            <dd>{item.visits}</dd>
                                        </div>
                                    </dl>
                                    </div>
                                </div>//rankingItem의 끝-----------------
                                )
                            })
                            // 맵의 끝----------------
                        }
                    </div>
            </section>
            
        </div>
    </div>
  )
}

export default Visitor
