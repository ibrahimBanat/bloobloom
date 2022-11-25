import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.png";
import styles from '../../assets/modules/Header.module.css';
import {MenuContext} from "../../context/MenuContext";

const Header = () => {
    return (
      <>
          <section>
              <header className={styles.wrapper}>
                  <nav className={styles.navbar}>
                      <ul className={styles.navLinks}>
                                <MenuContext.Consumer>
                                    {({outer, setOuter}) => (
                                        <li className={styles.navLink}
                                            onMouseEnter={() => setOuter(true)}
                                            onMouseLeave={() => setOuter(false)}
                                            onFocus={() => setOuter(true)}
                                        >
                                            <div className={styles.navLinkBox}>
                                                <div>
                                            <span className={styles.menuButton} role={'button'}
                                            >
                                                Menu
                                            </span>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </MenuContext.Consumer>
                          <li className={`${styles.navLink} ${styles.navLinkMain}`}>
                              <div>
                                  <Link to={'/'} role={'button'}>
                                      <img src={logo} alt="" className={styles.logo}/>
                                  </Link>
                              </div>
                          </li>
                          <li className={styles.navLink}>
                              <div className={styles.navLinkBox}>
                            <span>
                                Bag (0)
                            </span>
                              </div>
                          </li>
                      </ul>
                  </nav>
              </header>
          </section>
      </>
    );
}

export default Header;
