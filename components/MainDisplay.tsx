import React from 'react';
import styles from './MainDisplay.module.scss';

const MainDisplay: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.display}>
        <img src="./img-bg.svg" alt="image" className={styles.bg}/>

        <div className={styles.container}>
            <img src="./lantern-1.svg" alt="image" className={styles.lantern1}/>
            <img src="./lantern-2.svg" alt="image" className={styles.lantern2}/>

          <div className={styles.images}>
            <img src="./img-1.svg" alt="image" className={styles.img1}/>
            <img src="./img-2.svg" alt="image" className={styles.img2}/>
            <img src="./img-3.svg" alt="image" className={styles.img3}/>
            <img src="./img-4.svg" alt="image" className={styles.img4}/>
            <img src="./img-5.svg" alt="image" className={styles.img5}/>
            <img src="./img-6.svg" alt="image" className={styles.img6}/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainDisplay;