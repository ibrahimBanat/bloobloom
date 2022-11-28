import {FunctionComponent, useEffect, useState} from "react";
import {GlassItemInterface, GlassVariant} from "../interfaces/glass-item.interface";
import styles from '../assets/modules/Glass.module.css';

const Glass = (props: { glass: GlassItemInterface }) => {
    const {glass} = props;
    const [imgPosition, setImgPosition] = useState(0);
    const [currentGlassVariant, setCurrentGlassVariant] = useState<GlassVariant[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        setCurrentGlassVariant(glass.glass_variants);
    }, []);
    return (<div key={glass.id + '-' + glass.name}>
                <div className={styles.leftControl}
                    onClick={() => {
                        if(imgPosition > 0) {
                            return setImgPosition(imgPosition - 1);
                        }
                        return setImgPosition(currentGlassVariant[currentIndex]?.media.length - 1);
                    }}
                >
                    <span className={styles.hideDesktop}>
                        &lt;
                    </span>
                </div>
                <div className={styles.header}>
                    <span key={glass.name + '-' + currentIndex}>{glass.name}</span>
                    <span className={styles.glassVariant}>{currentGlassVariant[currentIndex]?.frame_variant?.colour?.name}</span>
                </div>
                <img width={100}
                     height={100}
                     src={currentGlassVariant[currentIndex]?.media[imgPosition]?.url}
                     alt={glass.name + '' + currentGlassVariant[currentIndex]?.frame_variant?.colour?.name}
                     className={styles.glassImage}
                />
                <div className={styles.colors}>
                    {currentGlassVariant?.map((color, index) => (<>
                            <div className={`${styles.colorWrapper}  ${currentIndex == index? styles.active : ''}`}>
                                <div style={{
                                    backgroundImage: `url(${color.frame_variant.colour.media[0].url})`,
                                }} onClick={() => setCurrentIndex(index)}
                                     className={`${styles.color}`}
                                />
                            </div>
                        </>))}
                </div>
                <div className={styles.rightControl} onClick={() => {
                    if(imgPosition < currentGlassVariant[currentIndex]?.media.length - 1) {
                        return setImgPosition(imgPosition + 1);
                    }
                     setImgPosition(0);
                }}>
                    <span className={styles.hideDesktop}>
                        &gt;
                    </span>
                </div>
        </div>)
}

export default Glass;
