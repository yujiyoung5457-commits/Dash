import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, LineController,
    ScatterController, RadarController, RadialLinearScale,
    Tooltip, Legend, Filler,
    plugins,
    scales,
    Ticks,
    animator,
 } from 'chart.js'
import { Line, Scatter, Radar } from 'react-chartjs-2'
import styles from './User.module.scss'
import { color } from 'chart.js/helpers'
import { data } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController,
    ScatterController, RadarController, RadialLinearScale,
    Tooltip, Legend, Filler)
const User = () => {
    const poData=[
        {title:'전체회원', value: '3,565,456명', percent: 82},
        {title:'신규회원', value: '3,568명', percent: 23},
        {title:'활성회원', value: '8,600명', percent: 12},
        {title:'휴먼회원', value: '1,235명', percent: 62},
    ]

    const lineData={
        labels: ['3월', '4월', '5월', '6월', '7월', '8월'],
        datasets:[
            {
                label: '신규회원',
                data:[150, 326, 421, 123, 412, 411],
                borderColor: 'rgb(64, 94, 228) ',
                backgroundColor: 'rgba(173, 188, 255, 0.2)',
                borderWidth:3,
                tension:0.4,
                fill:true,
                pointRadius:4,
                pointHoverRadius:8,
                pointBackgroundColor:'white',
                pointBorderColor:'rgb(64, 94, 228) ',
                pointBorderWidth:3,
            },
        ]
    }
    
    const lineOption={
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:false,

            },
            Tooltip:{
                backgroundColor:'white',
                titleColor: '#333',
                bodyColor:'orange',
                padding: 12,
            },
        },
        scales:{
            x:{
                grid:{
                    display:false,
                },
                border:{
                    display:false,
                },
                Ticks:{
                    color:'#333',
                    font:{
                        size:12,
                        weight:500,
                    }
                }
            },
            y:{
                beginAtZero:true,
                grid:{
                    display:true,
                },
                border:{
                    display:false,
                },
                Ticks:{
                    color:'#333',
                    font:{
                        size:12,
                        weight:500,
                    }
                }
            }
        }
    }
    //분산그래프-----------------------------두 개의 데이터 사이에 어떤 관계가 있나 확인하는 그래프
    //예) 광고비와 매출 사이의 관계 등/ 찜한 도서 수, 실제 읽은 도서 수의 관계
    const userData = [
  {
    id: 'book001',
    name: '홍길동',
    nickname: '책벌레',
    email: 'book001@test.com',
    joinDate: '2026-02-14',
    lastVisit: '2026-08-24',
    status: '활성',
    favorite: 38,
    read: 30,
    readingTime: 52,
  },

  {
    id: 'reader02',
    name: '김민지',
    nickname: '민지북',
    email: 'reader02@test.com',
    joinDate: '2026-03-22',
    lastVisit: '2026-08-23',
    status: '활성',
    favorite: 25,
    read: 21,
    readingTime: 43,
  },

  {
    id: 'novel07',
    name: '이서준',
    nickname: '소설왕',
    email: 'novel07@test.com',
    joinDate: '2026-01-03',
    lastVisit: '2026-08-20',
    status: '활성',
    favorite: 54,
    read: 42,
    readingTime: 68,
  },

  {
    id: 'green11',
    name: '박지현',
    nickname: '그린북',
    email: 'green11@test.com',
    joinDate: '2025-12-17',
    lastVisit: '2026-07-02',
    status: '휴면',
    favorite: 34,
    read: 15,
    readingTime: 20,
  },

  {
    id: 'hello22',
    name: '최유진',
    nickname: '페이지22',
    email: 'hello22@test.com',
    joinDate: '2026-04-11',
    lastVisit: '2026-08-24',
    status: '활성',
    favorite: 42,
    read: 36,
    readingTime: 61,
  },

  {
    id: 'story33',
    name: '정하늘',
    nickname: '하늘책',
    email: 'story33@test.com',
    joinDate: '2026-05-05',
    lastVisit: '2026-08-21',
    status: '활성',
    favorite: 18,
    read: 12,
    readingTime: 35,
  },

  {
    id: 'page100',
    name: '한지우',
    nickname: '백페이지',
    email: 'page100@test.com',
    joinDate: '2026-05-19',
    lastVisit: '2026-07-01',
    status: '휴면',
    favorite: 47,
    read: 19,
    readingTime: 27,
  },

  {
    id: 'booktree',
    name: '오민수',
    nickname: '북트리',
    email: 'booktree@test.com',
    joinDate: '2026-06-08',
    lastVisit: '2026-08-23',
    status: '활성',
    favorite: 61, //찜한 책 수
    read: 48, //읽은 책의 수
    readingTime: 72,
  },
]
//________________________________________________________________________________
    const [keyword, setKeyWord]=useState('')  //검색어
    const [status, setStatus]=useState('전체') //회원상태 전체, 휴면, 활성
    const [selectUser, setSelectUser]=useState(null) //모달창을 위해 만든것


    const filterUser=userData.filter((item)=>{
        const word=keyword.toLocaleLowerCase()
        const searchMatch=item.id.toLocaleLowerCase().includes(word) ||
                          item.name.includes(keyword) ||
                          item.nickname.toLocaleLowerCase().includes(keyword)

        const statusMatch=status ==='전체'||item.status===status
        return searchMatch && statusMatch
    })
//________________________________________________________________________________

    const scatterData={
        datasets:[
            {
            label:'회원',
            data: userData.map((item)=>({
                x:item.favorite,
                y:item.read,
            })),
            backgroundColor: 'rgb(64, 94, 228) ',
            borderColor: 'rgb(64, 94, 228) ',
            pointStyle:'rectRot', //circle이 원모양, star가 별모양 triangle:삼각현, 지금껀 다이아몬드
            pointStyle: 'rectRot', // 다이아몬드
            pointRadius: 6,       // 기본 크기
            pointHoverRadius: 8,  // 마우스 올렸을 때 크기
        },
            
        ]
    }

    const scatterOption={
         responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:false,

            },
            Tooltip:{
                backgroundColor:'white',
                titleColor: '#333',
                bodyColor:'orange',
                padding: 12,
            },

        },
        scales:{
            x:{
                beginAtZero:true,
                title:{
                    display:true,
                    text: '찜한 도서 수',
                    color:'#333',

                },
                grid:{
                    display:true,
                    color:'#ccc',

                },
                border:{
                    color: false,
                }
            },
            y:{
                beginAtZero:true,
                title:{
                    display:true,
                    text: '읽은 도서 수',
                    color:'#333',

                },
                grid:{
                    display:true,
                    color:'#ccc',

                },
                border:{
                    color: false,
                }
            }
        }
    }

    const raderData={
        labels: ['소설', '시/에세이', '인문','경제','자기계발', '과학'],
        datasets:[
            {
                label:'회원 독서 성향',
                data: [85, 41, 36, 69, 89, 70],
                backgroundColor:'rgba(255, 211, 92, 0.5)',
                pointRadius: 4,
                pointHoverRadius:6,
                pointBackgroundColor:'rgb(64, 94, 228)',
            },
        ]
    }
    const raderOptions={
        responsive:true,
        maintainAspectRatio:false,
        animation:{
            duration:12,
        },
        plugins:{
            legend:{
                display:false,

            },
            Tooltip:{
                padding: 12,
            },
        },
        scales:{
            r:{
                beginAtZero:true,
                min:0,
                max:100,
                ticks:{
                    display:false,
                },
                grid:{
                    color:'#ccc',

                },
                pointLabels:{
                    color:'#333',
                    font:{
                        size:12,
                        weight:500,

                    }
                }
            }
        }
    }
  return (
    <>
    <Helmet>
    <title>사용자 관리 | 관리자 대시보드</title>
    </Helmet>
    <div>
        <div>
            <h2 className={styles.mainTitle}>사용자 관리</h2>
            <p className={styles.pi}>회원현황과 독서 활동</p>
        </div>
        <section>
            {/* 프로그레스 시작 */}
            <title className={styles.progressTitle}>
                <h3>회원요약</h3>
                <p>현재 회원이용 현황</p>
            </title>
            <div className={styles.progressList}>
                {
                  poData.map((item)=>(
                    <div className={styles.first} key={item.title}>
                        <div>
                            <span>{item.title}</span>
                            <strong>{item.value}</strong>
                        </div>
                        <progress value={item.percent} max="100" />
                    </div>
                  ))  
                }
            </div>
        </section>

        <div className={styles.harf}>
        <div className={styles.topLine}>

            <article>
            {/* 첫번째 중ㄹ시작____라인그래프 시작_____ */}
            <div>
                <h3>회원가입 추이</h3>
                <p className={styles.smallTT}>최근 6개월 신규회원</p>
                </div>
            <section>
                <Line data={lineData} options={lineOption} />
            </section>
                </article>



            <section>
            {/* 분산그래프 시작__________________________ */}
            <div>
                <h3>찜한도서와 실제 도서</h3>
                <p className={styles.smallTT}>찜한도서와 실제 읽은 도서와의 관계</p>
            </div>
            <div className={styles.scatters}>
                <Scatter data={scatterData} options={scatterOption}/>
            </div>
            </section>
        </div>
</div>


        <div className={styles.here}>
            {/*  두번째 줄 박스_______________________ */}
            <section className={styles.firstWrap}>
                {/* 검색부분_____회원목록_____ */}
                <div>
                <h3>회원목록</h3>
                    <p className={styles.smallTT}>회원을 정보하고 상세정보를 확인합니다.</p>
                </div>


                <div className={styles.searchArea}>
                    <input type="text" placeholder='아이디, 닉네임, 이름 검색' value={keyword} onChange={(e)=>setKeyWord(e.target.value)}/>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="전체">전체</option>
                        <option value="활성">활성</option>
                        <option value="휴면">휴면</option>
                    </select>
                </div>

                <div className={styles.wrapW}>
                    <table>
                        <thead>
                            <tr className={styles.all}>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>가입일</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterUser.map((item)=>(
                                    <tr key={item.id} onClick={()=>selectUser(item)}>
                                       <td>{item.id}</td>
                                       <td>{item.name}</td>
                                       <td>{item.joinDate}</td>
                                       <td>{item.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>


            <section className={styles.book}>
                {/* 이미지가 들어가는 이달의 도서_________ */}
                <div>
                    <h3>인기도서</h3>
                    <p className={styles.smallTT}>이달의 인기 도서.</p>
                </div>
                <div className={styles.bookArea}>
                    <div className={styles.bookimg}></div>
                    <div className={styles.dec}>
                        <h2>햄스터 숲의 작은 모험</h2>
                        <br />
                        <span>이 책은 햄스터 숲에서 일어나는 사건들을 다룬 소설이다.
                            주인공은 골든햄스터와 로브스키 종이 섞인 혼혈이다.
                            햄스터가 숲에서 전해내려오는 전설인 '황금 버섯'을 찾기 위해 떠다는 여행을 그린 이야기이다. </span>
                    </div>
                </div>
            </section>

            <section className={styles.Rader}>
                {/* 차트_____성향분석__카테고리별 분석(레더차트) */}
                <div>
                    <div>
                        <h3>회원독서 성향</h3>
                        <p className={styles.smallTT}></p>
                    </div>

                    <div className={styles.radarCanvas}>
                        <Radar data={raderData} options={raderOptions} />
                    </div>
                </div>
            </section>
        </div>
        {  //여긴 모달창 안쪽
            selectUser&&(
                <div className={styles.modaliBig}>
                    <div className={styles.modal}>
                        <div>
                            <div>
                                <h3>회원 상세 정보</h3>
                                <p>{selectUser.id}의 아이디</p>
                                <button onClick={()=>{setSelectUser(null)}}>X</button>
                            </div>
                        </div>
                        <dl className={styles.modalList}>
                           <div>
                            <dt>이름</dt>
                            <dd>{selectUser.name}</dd>
                            </div> 

                             <div>
                            <dt>닉네임</dt>
                            <dd>{selectUser.nickname}</dd>
                            </div> 

                             <div>
                            <dt>이메일</dt>
                            <dd>{selectUser.email}</dd>
                            </div> 

                             <div>
                            <dt>가입일</dt>
                            <dd>{selectUser.joinDate}</dd>
                            </div> 

                             <div>
                            <dt>최근접속일</dt>
                            <dd>{selectUser.lastVisit}</dd>
                            </div> 

                             <div>
                            <dt>회원상태</dt>
                            <dd>{selectUser.status}</dd>
                            </div>

                            <div>
                            <dt>찜한 도서</dt>
                            <dd>{selectUser.favorite}권</dd>
                            </div>  

                             <div>
                            <dt>읽은 도서</dt>
                            <dd>{selectUser.read}권</dd>
                            </div>

                             <div>
                            <dt>평균독서시간</dt>
                            <dd>{selectUser.readingTime}</dd>
                            </div>  
                        </dl>
                    </div> 
                    {/* 모달끝--------------------------------- */}
                </div> //큰 모달창
            )
        }
    </div>
    {/* 최종박스_____________________ */}
    </>
  )
}

export default User
