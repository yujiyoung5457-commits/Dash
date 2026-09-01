import React,{useState} from 'react'
import boardData from './data/boardData.json'
import { Helmet } from 'react-helmet-async'
import styles from './Board.module.scss'



const reviewData=boardData.reviewData
const feedData=boardData.feedData
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
  const filterFeed=feedData.filter((item)=>{
    const word=feedKey.trim().toLocaleLowerCase()
    const searchWord=item.title.toLocaleLowerCase().includes(word)||
     item.content.toLocaleLowerCase().includes(word)

     const searchSelect= feedState==='전체'||
     item.status===feedState

     return feedKey && searchSelect
  })
  
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

            <section className={styles.mainBox3}>
              <div>
                <div>
                  <h3>이벤트 피드 관리</h3>
                  <p>서비스 이벤트 게시판을 관리합니다.</p>
                </div>
                <span>
                  {}건
                </span>
              </div>

                <div>
                  <input type="text" placeholder='이벤트 검색' value={feedKey} onChange={(e)=>setFeedKey(e.target.value)}/>

                  <select value={feedState} onChange={(e)=>setFeedState(e.target.value)}>
                      <option value="전체">전체 상태</option>
                      <option value="공개">공개</option>
                      <option value="비공개">비공개</option>
                  </select>
                </div>


                <div>
                  {
                    filterFeed.map((item)=>(
                      <div key={item.id}>
                        <div className={styles.feedWrap}>
                          <div className={styles.feedtitle}>
                            <strong>{item.title}</strong>
                            <span>{item.status}</span>
                            
                          </div>

                          <div>{item.content}</div>
                          <div>{item.startDate}~{item.endDate}</div>
                        </div>

                        <div className={styles.btns}>
                          <button onClick={()=>feedStateChange(item.id)}>{item.status==='공개' ? '비공개' :'공개'}</button>
                          <button onClick={()=>openFeedEvent(item)}>수정</button>
                          <button onClick={()=>delfeed(item.id)}>삭제</button>
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
