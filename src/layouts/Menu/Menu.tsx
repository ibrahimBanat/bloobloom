import React, {FunctionComponent, useEffect, useState} from "react";
import styles from '../../assets/modules/Menu.module.css';
import {MenuContext} from "../../context/MenuContext";
import {useFetch} from "../../hooks/fetch";
import {useInfiniteQuery} from "react-query";

const Menu:FunctionComponent = () => {
    const mainUrl = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/'
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('spectacles');
    // const [category, setCategory] = useState(MenuContext.Consumer.);
    // const result = useFetch('url', `${category}-${gender}`);
    const [gender, setGender] = useState('women');
    const url = mainUrl + `${category}-${gender}` + '/glasses';
    // const result = useFetch(url, `${category}-${gender}`);
    // console.log(result)
    const HandleClick = (category: string, gender: string) => {
        // console.log(url)
    }

    useEffect(() => {

    }, [category]);

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
                                onClick={() => HandleClick(category, 'men')}
                            >
                                <span className={styles.menuItemLink}>men-{category}</span>
                                <span></span>
                            </div>
                            <div className={styles.menuItem}>
                                <span className={styles.menuItemLink}>women-{category}</span>
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
