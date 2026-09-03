import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Setting.module.scss'

const Icon = ({ name, size = 25 }) => {
  const paths = {
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    book: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22.5z"/><path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
    shield: <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10z"/>,
    plus: <><path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="5"/></>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 10v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></>,
    export: <><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 14v6h14v-6"/></>,
    trash: <><path d="M4 7h16M9 3h6l1 4H8zM7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
    chevron: <path d="m9 5 7 7-7 7"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const managementCards = [
  { icon: 'user', title: '관리자 계정', text: '관리자 계정 정보와 비밀번호를 관리합니다.' },
  { icon: 'book', title: '대출 정책', text: '도서 대출 기간, 연장, 예약 정책을 설정합니다.' },
  { icon: 'shield', title: '사용자 권한', text: '사용자 등급별 권한과 접근 범위를 설정합니다.' },
]

const Setting = () => {
  const [service, setService] = useState({ name: 'Book.JS', email: 'admin@bookjs.com', intro: '함께 읽고, 함께 성장하는 도서 관리 플랫폼 Book.JS' })
  const [notifications, setNotifications] = useState({ overdue: true, signup: true, report: true })
  const [notice, setNotice] = useState('')
  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 1800) }
  const updateService = (event) => setService({ ...service, [event.target.name]: event.target.value })
  const toggleNotification = (key) => setNotifications({ ...notifications, [key]: !notifications[key] })

  return (
    <>
      <Helmet><title>관리자 설정 | Book.JS</title></Helmet>
      <div className={styles.page}>
        <header className={styles.pageHeader}><h2>관리자 설정</h2><p>Book.JS 서비스 운영 환경을 관리하세요.</p></header>
        <section className={styles.quickGrid} aria-label="빠른 설정">
          {managementCards.map((card) => (
            <article className={styles.quickCard} key={card.title}>
              <span className={styles.iconCircle}><Icon name={card.icon} size={32} /></span>
              <div><h3>{card.title}</h3><p>{card.text}</p><button type="button" className={styles.manageButton} onClick={() => showNotice(`${card.title} 메뉴를 선택했습니다.`)}>관리 <Icon name="chevron" size={16} /></button></div>
            </article>
          ))}
          <button type="button" className={`${styles.quickCard} ${styles.addBook}`} onClick={() => showNotice('도서 추가 버튼을 선택했습니다.')}><span className={styles.iconCircle}><Icon name="plus" size={31} /></span><span>도서 추가</span></button>
        </section>
        <div className={styles.settingsGrid}>
          <section className={`${styles.panel} ${styles.basicPanel}`}>
            <h3>서비스 기본 설정</h3>
            <form onSubmit={(event) => { event.preventDefault(); showNotice('변경사항이 저장되었습니다.') }}>
              <label><span>서비스 이름</span><input name="name" value={service.name} onChange={updateService} /></label>
              <label><span>관리자 이메일</span><input name="email" type="email" value={service.email} onChange={updateService} /></label>
              <label className={styles.introField}><span>소개 문구</span><textarea name="intro" value={service.intro} onChange={updateService} /></label>
              <button className={styles.primaryButton} type="submit">변경사항 저장</button>
            </form>
          </section>
          <div className={styles.rightColumn}>
            <section className={styles.panel}>
              <h3>알림 설정</h3><div className={styles.toggleList}>
                {[['overdue', '연체 도서 알림'], ['signup', '신규 회원 가입 알림'], ['report', '게시글 신고 알림']].map(([key, label]) => (
                  <div className={styles.toggleRow} key={key}><span>{label}</span><button type="button" role="switch" aria-checked={notifications[key]} className={`${styles.toggle} ${notifications[key] ? styles.on : ''}`} onClick={() => toggleNotification(key)}><span>{notifications[key] ? 'ON' : 'OFF'}</span><i /></button></div>
                ))}
              </div>
            </section>
            <section className={`${styles.panel} ${styles.dataPanel}`}>
              <h3>데이터 관리</h3><div className={styles.dataActions}>
                <button type="button" onClick={() => showNotice('데이터 백업을 요청했습니다.')}><Icon name="database" size={20} />데이터 백업하기</button>
                <button type="button" onClick={() => showNotice('회원 데이터 내보내기를 요청했습니다.')}><Icon name="export" size={20} />회원 데이터 내보내기</button>
                <button type="button" className={styles.dangerButton} onClick={() => showNotice('초기화 버튼을 선택했습니다.')}><Icon name="trash" size={20} />서비스 데이터 초기화</button>
              </div>
            </section>
          </div>
        </div>
        {notice && <div className={styles.toast} role="status">{notice}</div>}
      </div>
    </>
  )
}

export default Setting
