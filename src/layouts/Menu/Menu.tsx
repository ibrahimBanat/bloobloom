import React, {FunctionComponent, useEffect, useState} from "react";
import styles from '../../assets/modules/Menu.module.css';
import {MenuContext} from "../../context/MenuContext";
import {Link} from "react-router-dom";


const Menu:FunctionComponent = () => {
    const [category, setCategory] = useState('spectacles');

    return (
      <>
        <MenuContext.Consumer>
            {({
                  outer,
                  setOuter, inner,
                  setInner,
              }) => (
                <>
                    <aside className={`${styles.aside} ${outer? styles.show : ''}`} tabIndex={-1}
                           onMouseOver={() => {
                               setOuter(true);
                           }}
                           onMouseLeave={() => {
                               setOuter(false);
                           }}
                    >
                        <article>
                            <div className={styles.menuItem}
                                 onClick={() => {
                                        setCategory('spectacles');
                                        setInner(true);
                                 }}
                            >
                                <span className={styles.menuItemLink}>spectacles</span>
                                <span></span>
                            </div>
                            <div className={styles.menuItem}
                                 onClick={() => {
                                     setCategory('sunglasses');
                                     setInner(true);
                                 }}
                            >
                                <span className={styles.menuItemLink}>sunglasses</span>
                                <span></span>
                            </div>
                            <div className={styles.menuItem}>
                                <span className={styles.menuItemLink}>
                                    home try on
                                </span>
                            </div>
                            <div className={styles.menuItem}>
                                <span className={styles.menuItemLink}>
                                    pair for pair
                                </span>
                            </div>
                        </article>
                        <article className={`${styles.nestedAside} ${inner? styles.showInner : ''}`} tabIndex={-1}>
                            <div className={styles.menuItem}
                                onClick={() => setInner(false)}
                            >
                                <span></span>
                                <span className={styles.menuItemLink}>go back</span>
                            </div>
                            <div className={styles.menuItem}
                            >
                                <Link to={`collections/${category}-men`}>
                                    <span className={styles.menuItemLink}>men-{category}</span>
                                </Link>
                                <span></span>
                            </div>
                            <div className={styles.menuItem}>
                                <Link to={`collections/${category}-women`}>
                                    <span className={styles.menuItemLink}>women-{category}</span>
                                </Link>
                                <span></span>
                            </div>
                        </article>
                    </aside>
                </>
            )}
        </MenuContext.Consumer>
      </>
    );
}
export default Menu;
