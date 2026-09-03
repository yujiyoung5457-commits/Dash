import React,{useState} from 'react'
import boardData from './data/boardData.json'
import { Helmet } from 'react-helmet-async'
import styles from './Board.module.scss'

const reviewData=boardData.reviewData
const feedData=boardData.feedData
const reviewCards = [
  { id: 1, image: '/8.jpg', book: '불편한 편의점', user: '@yujy03님', text: '독창적인 스토리가 너무...' },
  { id: 2, image: '/1.jpg', book: '싯다르타', user: '@may55님', text: '무슨 내용이었는지...' },
  { id: 3, image: '/7.jpg', book: '아몬드', user: '@ppsom님', text: '읽으면서 묘한...' },
  { id: 4, image: '/6.jpg', book: '돈의 흐름을 읽는 법', user: '@money12님', text: '경제를 이해하기 좋았어요...' },
  { id: 5, image: '/5.jpg', book: '단어가 품은 세계', user: '@word77님', text: '문장이 오래 기억에 남아요...' },
]
/*
useEffect(()=>{
  fetch('/data/board.json')
  .then((res)=>res.json())
  .then((data)=>setBoards(data))
  },[])
*/


const Board = () => {
  //리뷰게시판에 필요한 const
  const [reviewKeyword, setReviewKeyword]=useState('')
  const [selectReview, setSelectReview]=useState('전체')
  const [selectDatas, setSelectDatas]=useState(null)
  const [reviewSlide, setReviewSlide]=useState(0)

  const moveReviewSlide = (direction) => {
    setReviewSlide((current) => (current + direction + reviewCards.length) % reviewCards.length)
  }
  const visibleReviewCards = Array.from(
    { length: Math.min(3, reviewCards.length) },
    (_, index) => reviewCards[(reviewSlide + index) % reviewCards.length],
  )

  //리뷰검색
  const filterReviw=reviewData.filter((item)=>{
    const word=reviewKeyword.trim().toLocaleLowerCase()

    const SearchWord=item.book.toLocaleLowerCase().includes(word)
    const rathingMatch=selectReview==="전체" || item.rating===Number(selectReview)
    return SearchWord && rathingMatch
  })

  //이벤트 피드----------------------------------
  const [feeds, setFeeds]=useState(feedData)
  const [feedKey, setFeedKey]=useState('')
  const [feedState, setFeedState]=useState('전체')
  //이벤트 피드 검색 부분-------------------------
  const filterFeed = feedData.filter((item) => {
  const word = feedKey.trim().toLocaleLowerCase();

  const searchWord =
    item.title.toLocaleLowerCase().includes(word) ||
    item.content.toLocaleLowerCase().includes(word);

  const searchSelect =
    feedState === '전체' ||
    item.status === feedState;

  return searchWord && searchSelect;
});
  
  //이벤트 피드 기능들 공개.비공개/ 수정삭제
  const feedStateChange=(id)=>{
    setFeeds(feeds.map((item)=>item.id===id ? 
    {...item,
       state : item.status==='공개'?'비공개':'공개'
      }
      :item
    )
  )
  }
const [feedSelect, setFeedSelect]=useState(null)
  // 이벤트 수정 모달 열기
  const openFeedEvent=(feed)=>{
    if(!feedSelect.title.trim())

    setFeedSelect(feed)
    return
  }
//이벤트 수정, 저장
const saveFeed=()=>{
  setFeeds(feeds.map((item)=>item.id===id ? feedSelect:item))
  setFeedSelect(null)
}

//에ㅣ벤트 삭ㅈ제
const delfeed=(id)=>{
  setFeeds(feeds.filter((item)=>item.id !== id))
}



  return (
    <>
    <Helmet>
        <title>게시판 관리 | 관리자 대시 보드</title>
      </Helmet>
      {/* ---------------------- */}
      <main>
        <div>

        </div>



{/* ----전체섹션관리--------------- */}
        <div className={styles.section1}>
          {/* 리뷰관리/별점이 몇개인지 */}

          <div>
            <section className={styles.mainBox}>
                <div>
                  <h2>리뷰 관리 게시판</h2>
                  <p>회원이 작성한 도서 리뷰를 확인합니다</p>
                </div>
               
            </section>
          </div>

          <div className={styles.boardRow}>
            <div className={styles.reviewColumn}>
            <section className={styles.mainBox2}>
                <div>
                  <h2>리뷰 관리 게시판</h2>
                  <p>회원이 작성한 도서 리뷰를 확인합니다</p>
                  <span>
                  {filterReviw.length}건
                </span>
                </div>
                
                <div className={styles.form}>
                <input type="text" placeholder='도서명 검색' value={reviewKeyword} onChange={(e)=>setReviewKeyword(e.target.value)}/>
                <select value={selectReview} onChange={(e)=>setSelectReview(e.target.value)}>
                  <option value="전체">전체평점</option>
                  <option value="5">5점</option>
                  <option value="4">4점</option>
                  <option value="3">3점</option>
                  <option value="2">2점</option>
                  <option value="1">1점</option>
                </select>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>도서명</th>
                      <th>회원</th>
                      <th>평점</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tree}>
                      {
                        filterReviw.map((item)=>(
                          <tr key={item.id} onClick={()=>setSelectDatas(item)}>
                            <td>{item.book}</td> 
                            <td>{item.user}</td> 
                            <td>{  "⭐".repeat(item.rating)}</td> 
                            <td>{item.date}</td>                           
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
            </section>
            {/* ---------------------------2번째 칸 */}
            <section  className={styles.secondsection}>
              <button type="button" className={styles.slideButton} onClick={() => moveReviewSlide(-1)} aria-label="이전 리뷰">‹</button>
              <div className={styles.sliderViewport}>
                <div className={styles.sliderTrack} key={reviewSlide}>
                  {visibleReviewCards.map((review) => (
                    <div className={styles.slide} key={review.id}>
                      <article className={styles.card}>
                        <img src={review.image} alt={`${review.book} 리뷰 이미지`} />
                        <div className={styles.white}>
                          <h2>{review.book}</h2>
                          <h4>{review.user}</h4>
                          <p>{review.text}</p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" className={styles.slideButton} onClick={() => moveReviewSlide(1)} aria-label="다음 리뷰">›</button>
            </section>
            </div>
            <section className={styles.mainBox3}>
              <div className={styles.block}>
                <div>
                  <h3>이벤트 피드 관리</h3>
                  <p className={styles.smallTT}>서비스 이벤트 게시판을 관리합니다.</p>
                </div>
                <span>
                  {feedState}건
                </span>
              </div>

                <div className={styles.block2}>
                  <input type="text" placeholder='이벤트 검색' value={feedKey} onChange={(e)=>setFeedKey(e.target.value)}/>

                  <select value={feedState} onChange={(e)=>setFeedState(e.target.value)}>
                      <option value="전체">전체 상태</option>
                      <option value="공개">공개</option>
                      <option value="비공개">비공개</option>
                  </select>
                </div>


                <div className={styles.cards}>
                  {
                    filterFeed.map((item)=>(
                      <div key={item.id}>
                        <div className={styles.feedWrap}>
                          <div className={styles.feedtitle}>
                            <strong>{item.title}</strong>
                            <span>{item.status}</span>
                            
                          </div>

                          <div>{item.content}</div>
                          
                          <div className={styles.btns}>
                            <div>{item.startDate}~{item.endDate}</div>
                            <div className={styles.btnn}>
                              <button onClick={()=>feedStateChange(item.id)}>{item.status==='공개' ? '비공개' :'공개'}</button>
                              <button onClick={()=>openFeedEvent(item)}>수정</button>
                              <button onClick={()=>delfeed(item.id)}>삭제</button>
                          </div>
                        </div>
                        </div>

                        
                      </div>
                    ))
                  }
                </div>
            </section>
          </div>

          {selectDatas && (
            <section className={styles.modal}>
              <div className={styles.modalBox}>
                <div>
                  <p>REVIEW</p>
                  <h3>리뷰상세</h3>
                </div>
                <button onClick={()=>setSelectDatas(null)}>
                  X
                </button>
                <div className={styles.flexBox}>
              <dt>도서명</dt>
              <dd>{selectDatas.book}</dd>
            </div>
               <div className={styles.flexBox}>
              <dt>회원</dt>
              <dd>{selectDatas.user}</dd>
            </div>
               <div className={styles.flexBox}>
              <dt>평점</dt>
              <dd>{selectDatas.rating}</dd>
            </div>
              </div>
            
            </section>
          )}
          
        </div>
       
      </main>
    </>
  )
}

export default Board
