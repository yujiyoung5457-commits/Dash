import React,{useState, useEffect} from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Book.module.scss'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Ticks, Tooltip, plugins, scales } from 'chart.js'
import { Doughnut, Bubble, PolarArea } from 'react-chartjs-2'
import { callback, color } from 'chart.js/helpers'

ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Filler, Legend)
const Book = () => {

    const bookData = [
  {
    id: 1,
    title: '단어가 품은 세계',
    author: '황선엽',
    category: '인문/교양',
    image: '/1.jpg',
    point: '인문/교양 카테고리 추천 1위',
    daily: 98, weekly: 94, monthly: 91, change: 2,
    price: 18000, pages: 328, sales: 1650,
    size: '64.2MB',
    publisher: '북하우스',
    publishDate: '2026.03.14',
    ebookDate: '2026.03.21',
  },
  {
    id: 2,
    title: '구해줘',
    author: '기욤 뮈소',
    category: '소설',
    image: '/2.jpg',
    point: '소설 카테고리 추천 1위',
    daily: 95, weekly: 97, monthly: 93, change: 1,
    price: 22000, pages: 412, sales: 1420,
    size: '71.8MB',
    publisher: '밝은세상',
    publishDate: '2026.02.11',
    ebookDate: '2026.02.18',
  },
  {
    id: 3,
    title: '매 순간 선택이 삶을 바꾼다',
    author: '김태훈',
    category: '자기계발',
    image: '/3.jpg',
    point: '자기계발 카테고리 추천 1위',
    daily: 92, weekly: 90, monthly: 96, change: -1,
    price: 16000, pages: 280, sales: 1180,
    size: '53.4MB',
    publisher: '마인드북',
    publishDate: '2026.01.20',
    ebookDate: '2026.01.24',
  },
  {
    id: 4,
    title: '싯다르타',
    author: '헤르만 헤세',
    category: '소설',
    image: '/4.jpg',
    point: '소설 카테고리 추천 2위',
    daily: 89, weekly: 92, monthly: 90, change: 3,
    price: 14500, pages: 240, sales: 780,
    size: '42.1MB',
    publisher: '문예출판사',
    publishDate: '2025.12.12',
    ebookDate: '2025.12.20',
  },
  {
    id: 5,
    title: '저희 남매를 위한 최고의 선택',
    author: '최서윤',
    category: '어린이/청소년',
    image: '/5.jpg',
    point: '어린이/청소년 카테고리 추천 1위',
    daily: 86, weekly: 88, monthly: 87, change: 1,
    price: 13500, pages: 210, sales: 930,
    size: '38.2MB',
    publisher: '키즈북',
    publishDate: '2026.04.05',
    ebookDate: '2026.04.10',
  },
  {
    id: 6,
    title: '돈의 흐름을 읽는 법',
    author: '박정호',
    category: '경제/경영',
    image: '/6.jpg',
    point: '경제/경영 카테고리 추천 1위',
    daily: 84, weekly: 91, monthly: 94, change: 4,
    price: 19500, pages: 352, sales: 2410,
    size: '69.7MB',
    publisher: '경제북스',
    publishDate: '2026.03.18',
    ebookDate: '2026.03.25',
  },
  {
    id: 7,
    title: '오늘 하루도 충분히 좋았다',
    author: '이현진',
    category: '시/에세이',
    image: '/7.jpg',
    point: '시/에세이 카테고리 추천 1위',
    daily: 82, weekly: 86, monthly: 88, change: 2,
    price: 15000, pages: 224, sales: 1250,
    size: '40.5MB',
    publisher: '감성책방',
    publishDate: '2026.05.10',
    ebookDate: '2026.05.15',
  },
  {
    id: 8,
    title: '처음 시작하는 사진',
    author: '정재훈',
    category: '취미/실용',
    image: '/8.jpg',
    point: '취미/실용 카테고리 추천 1위',
    daily: 79, weekly: 82, monthly: 85, change: -2,
    price: 17000, pages: 198, sales: 520,
    size: '86.1MB',
    publisher: '라이프북',
    publishDate: '2026.04.17',
    ebookDate: '2026.04.22',
  },
  {
    id: 9,
    title: '판타지 세계의 시작',
    author: '윤서진',
    category: '판타지/무협',
    image: '/7.jpg',
    point: '판타지/무협 카테고리 추천 1위',
    daily: 77, weekly: 80, monthly: 89, change: 5,
    price: 25000, pages: 468, sales: 2980,
    size: '91.4MB',
    publisher: '스토리랩',
    publishDate: '2026.03.05',
    ebookDate: '2026.03.08',
  },
  {
    id: 10,
    title: '월간 북라이프',
    author: '북라이프 편집부',
    category: '매거진',
    image: '/6.jpg',
    point: '매거진 카테고리 추천 1위',
    daily: 73, weekly: 78, monthly: 83, change: 1,
    price: 12000, pages: 145, sales: 420,
    size: '102MB',
    publisher: '북라이프',
    publishDate: '2026.08.01',
    ebookDate: '2026.08.01',
  },
]

const categories=[
    '종합',
    ...new Set(bookData.map((item)=>item.category)) //각 카테고리에 하나씨만, 중복을 없앰
]

const [category, setCategory]=useState('소설') //시 에세이 경제 등등
const [publisher, setPublisher]=useState('북라이프')//출판사 이름
const [period, setPeriod]=useState('일간')  //주간 월간
const [tt, setTt]=useState('북라이프')
const periodKey = {
  일간: 'daily',
  주간: 'weekly',
  월간: 'monthly',
}
const rankFilterBook = bookData
  .filter((item) => category === '종합' || item.category === category)
  .sort((a, b) => b[periodKey[period]] - a[periodKey[period]])
  .slice(0, 5)

const BTNbook = bookData
  .filter((item) => publisher === '북라이프' || item.publisher === publisher)
  .slice(0, 6)


const [selectBook, setSelectBook]=useState(bookData[0])
const [selectPB, setSelectPB]=useState(bookData[0])
const publishers = [...new Set(bookData.map((item) => item.publisher))]


const [searchWord, setSearchWord]=useState('')
const searchBook=()=>{
    const word=searchWord.trim().toLocaleLowerCase()

    if(!word) return
    const findBook=bookData.find((item)=>item.title.toLocaleLowerCase().includes(word) ||
                                        item.author.toLocaleLowerCase().includes(word)
    )
    if(findBook){
         selectBook(findBook)
        }
    }
//Bubble그레프는 3가지 데이터를 비교하기 위해서 만들어진 차트
//x(값축,항목), y(데이터 값),r(지름,원으ㅣ 크기)===>>원래 차트
//x(데이터1)값, y(데이터2)값2, r값(데이터3)===> 버블차트
//x=가격 y=페이지 r=판매량
const BubbleData={
 datasets:[
    {
        label:'도서 판매 분석',
        data:bookData.map((item)=>({
            x: item.price,
            y: item.pages,
            // r은 원의 '반지름(px)'이다. 판매량을 그대로 쓰면 원의 크기 차이가 너무 커진다.
            r: 8 + item.sales / 250,
            title: item.title,
            sales: item.sales,
        })),
        backgroundColor: bookData.map((_,index)=>`hsla(${index*25}, 55%, 75%)`),
        borderWidth: 1,
    }
 ]
}
const BubbleOptions={
    responsive:true,
    // 부모(.bubbleChart)의 고정 높이를 사용한다. 부모 높이 없이 false를 쓰면
    // 반응형 크기 계산이 반복되어 차트가 세로로 계속 커질 수 있다.
    maintainAspectRatio:false,
    plugins:{
        legend:{
            display:false
        },
        Tooltip:{
            titleColor: '#333',
            bodyColor: '#333',
            padding:12,
            callback:{
                title: (item)=>item(0).raw.title,
                label:(contex)=>[
                    `가격 ${contex.raw.x.toLocaleString()}원`,
                    `페이지${contex.raw.y}p`,
                    `판매량${contex.raw.sales.toLocaleString()}권`,
                ]
            }
        },
        scales:{
            x:{
                min: 10000,
                title:{
                    display:true,
                    text:'도서가격',
                    color:'#777',
                },
                grid:{
                    color:'#eee'
                },
                ticks:{
                    color: '#333',
                    callback: (value)=>`${value/10000}만`,
                }
            },
            y:{
                beginAtZero: true,
                title:{
                    display:true,
                    text:'페이지수',
                    color:'#777',
                }
            }
            
        }
    }

}

const mediaData=[
        {title:'전자책', value: 52, rot: 45},
        {title:'오디오북', value: 32, rot: 150},
        {title:'챗북', value: 45, rot: 32},
        {title:'오브제북', value: 73, rot: 163},
        {title:'도슨트', value: 36, rot: 86},
]
const MediaDoughnut=({ title, value, rot })=>{
    const data={
        datasets:[
            {
                data: [value, 100-value],
                backgroundColor:['orange','#eee'],
                borderRadius:10,
                borderWidth: 0,
                hoverOffset:2,
            }
        ]
    }

    const options={
        responsive:true,
        maintainAspectRatio:false,
        rotation: rot,
        cutout: '82%',
        plugins:{
            legend:{
                display:false,
            },
            Tooltip:{
                display:false,
                enabled:false,
            }
        }
    }
    return (
  <div className={styles.mediaItem}>
    <Doughnut data={data} options={options} />

    <div className={styles.circleCenter}>
      <strong>{title}</strong>
      <p>{value}%</p>
    </div>
  </div>
)
}


const circleData = [
  { title: '소설', val: 50  },
  { title: '경제/경영', val: 30 },
  { title: '자기계발', val: 70},
  { title: '인문/교양', val: 60},
  { title: '시/에세이', val: 40},
  { title: '어린이', val: 10},
]
const polaData={
    labels: circleData.map((item) => item.title),
    datasets:[
    {
        label:'장르별 독서 몰입도',
        data: circleData.map((item) => item.val),
        backgroundColor: circleData.map((_,index)=>`hsla(${index*25}, 55%, 75%)`),
        borderWidth: 1,
    }
 ]
}

const polaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            max: 100,
        },
    },
    tooltip:{
        backgroundColor:'#fff',
        color: '#333'
    }
}

  return (
    <>
    <Helmet>
        <title>도서관리 | 관리자 대시보드</title>
    </Helmet>
    <main className={styles.wrap}>
        {/* 1번째 상자 */}
       <section>
            <div>
                <div>
                    <h2 className={styles.mainTT}>도서관리</h2>
                    <p className={styles.smalltt}>도서 이용 현황과 인기 컨텐츠를 확인합니다</p>
                </div>
                <div className={styles.layout}>
                    {/* 왼쪽 */}
                    <div className={styles.colum}>
                    <div className={styles.col}>
                        <section>
                            <div className={styles.blueTitle}>
                                <h3>인기 도서 순위</h3>
                            </div>
                        {/* 본문시작______________________ */}
                            <div className={styles.buttons}>
                            {
                                categories.map((item)=>(
                                    <button key={item} onClick={()=>setCategory(item)}>
                                        {item}
                                    </button>
                                ))
                            }
                            </div>
                            <div className={styles.week}>
                                <select value={period} onChange={(e)=>setPeriod(e.target.value)}>
                                    <option value="일간">일간</option>
                                    <option value="주간">주간</option>
                                    <option value="월간">월간</option>
                                </select>
                            </div>
                            {/* 카드가 나타나는 부분 */}
                            <div className={styles.rankList}>
                                {
                                    rankFilterBook.map((item, idx)=>(
                                        <div className={styles.bookimg} key={item.id} onClick={()=>setSelectBook(item)}>
                                            <img src={item.image} alt={item.title} />
                                            <strong>{idx+1}</strong>
                                            <div className={styles.bookDec}>
                                                <strong className={styles.notSTR}>{item.title}</strong>
                                                <p>{item.author}</p>
                                                <span>
                                                    <b>Point</b>
                                                    {item.point}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                        
                    </div>
                                <section>
                            <div className={styles.blueTitle}>
                                <h3>인기 키워드(출판사)</h3>
                            </div>
                            {/* 본문시작______________________ */}
                                {/* 맵을 써서 혼자 해보기 */}
                                <div className={styles.btnCategory}>
                                {
                                    BTNbook.map((item)=>(
                                        <button key={item.publisher} onClick={()=>setSelectPB(item)}>
                                            <button className={styles.buttonStyle}>#{item.publisher}</button>
                                        </button>
                                    ))
                                }
                            </div>
                        </section>
                              </div>  




                    {/* 중앙 */}
                    <div className={styles.center}>
                        <section  className={styles.inner}>
                            <div className={styles.blueTitle}>
                                <h3>도서 정보</h3>
                            </div>
                            {/* 본문시작______________________ */}
                            <form onSubmit={(e)=>{e.preventDefault()
                                                    searchBook()}}>
                                <input type="text" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
                                <button type='submit'>검색</button>
                            </form>
                            <div className={styles.see}>
                                <img src={selectBook.image} alt={selectBook.title} />
                                <div>
                                    <h3>{selectBook.title}</h3>
                                    <p>{selectBook.author}</p>
                                    <dl className={styles.three}>
                                        <div>
                                            <dt>카테고리</dt>
                                            <dd>{selectBook.category}</dd>
                                        </div>
                                         <div>
                                            <dt>가격</dt>
                                            <dd>{selectBook.price.toLocaleString()}원</dd>
                                        </div>
                                         <div>
                                            <dt>페이지</dt>
                                            <dd>{selectBook.pages}페이지</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>
                        <section className={styles.bb}>
                            <div className={styles.blueTitle}>
                                <h3>도서 판매분석</h3>
                            </div>
                            {/* 버블차트------------ */}
                            {/* 반응형 차트가 안정적으로 높이를 계산할 수 있는 컨테이너 */}
                            <div className={styles.bubbleChart}>
                                <Bubble data={BubbleData} options={BubbleOptions} />
                            </div>
                        </section>
                    </div>






                    {/* 끝 */}
                    <div className={styles.right}>
                        <section className={styles.five}>
                            <div className={styles.blueTitle}>
                                <h3>멀티미디어 도서 콘텐츠</h3>
                            </div>
                            {/* 본문시작______________________ */}
                            <div className={styles.innerFive}>
                                {
                                    mediaData.map((item)=>(
                                        <MediaDoughnut key={item.title} title={item.title} value={item.value} rot={item.rot}/>
                                    ))
                                }
                            </div>
                        </section>
                        <section className={styles.rose}>
                            <div className={styles.blueTitle}>
                                <h3>장르별 독서 몰입도</h3>
                            </div>
                            {/* 본문시작______________________ */}
                            <PolarArea data={polaData} />
                        </section>
                    </div>
                </div>
            </div>
            {/* ------------------ */}
            <div></div>
       </section>
    </main>
    </>
  )
}

export default Book
