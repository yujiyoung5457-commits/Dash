import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.logo}></h1>
        <div className={styles.admin}>
            <div className={styles.adminIcon}>
                A
            </div>

            <div>
                <strong>관리자</strong>
                <span>(Admin)</span>
            </div>
        </div>
    </header>
  )
}

export default Header