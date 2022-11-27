
import styles from '../assets/modules/Loading.module.css';

const Loading = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <article className={styles.loading}>
                    <div></div>
                    <div></div>
                </article>
            </div>
        </>
    )
}
export default Loading;
