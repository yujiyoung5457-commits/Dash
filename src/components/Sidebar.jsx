import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'

import styles from './Sidebar.module.scss'


const Sidebar = () => {

  const navRef=useRef(null)
  const boxRef=useRef(null)
  const menuFunc=(e)=>{
    const menu=e.currentTarget
    const navBox=navRef.current.getBoundingClientRect() //t,y,bottom, top, left, right의 좌표 값
    const menuBox=menu.getBoundingClientRect()  //어떤걸 클릭했는지 알려줌

    const targetY=menuBox.top-navBox.top 

    gsap.killTweensOf(boxRef.current) //기존 애니메이션 제거
    gsap.to(boxRef.current, {
      y: targetY,
      delay: 0.15,
      duration: 0.65,
      ease: 'power2.inOut'
    })
  }

  return (
    <aside className={styles.Sidebar}>
      <nav ref={navRef} className={styles.nav}>
        {/*움직이는 박스 */}
        <span ref={boxRef} className={styles.moveBox} />

        {/* 네비들 */}
        <NavLink to='/'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        대시보드
        </NavLink>

        <NavLink to='/visitor'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        방문
        </NavLink>

        <NavLink to='/user'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        사용자
        </NavLink>

        <NavLink to='/book'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        도서
        </NavLink>

        <NavLink to='/board'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        게시판
        </NavLink>

        <NavLink to='/setting'onClick={menuFunc} className={({isActive})=>isActive? styles.active : ''}>
        설정
        </NavLink>


      </nav>
    </aside>
  )
}

export default Sidebar
