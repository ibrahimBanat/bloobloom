import {ChangeEvent, useRef, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import Glass from "../../components/Glass";
import {GlassItemInterface} from "../../interfaces/glass-item.interface";
import styles from '../../assets/modules/Collection.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../components/Loading';

const Collection = () => {
    const params = useParams();
    const n = useNavigate();
    const [filter, setFilter] = useState<string[]>(['filters[frame_variant_home_trial_available]=false', 'filters[lens_variant_prescriptions][]=fashion', 'filters[lens_variant_types][]=classic']);

    function getUrl(pageParam: number) {
        let url = prepareUrl(pageParam, 'spectacles-women');
        switch (params.id) {
            case "spectacles-men":
            case "spectacles-women":
                url = prepareUrl(pageParam, params.id);
                break;
            case "sunglasses-men":
            case "sunglasses-women":
                url = prepareUrl(pageParam, params.id);
                break;
            default:
                n("/");
                break;
        }
        return url;
    }

    const LIMIT = useRef(12);
    const fetchGlasses = async ({pageParam = 1}) => {
        return await fetch(getUrl(pageParam))
            .then((res) => res.json())
            .then((res) => {
                res.next = pageParam * LIMIT.current < res.meta.total_count ? pageParam + 1 : undefined;
                return res;
            });
    };
    const {
        data, fetchNextPage, hasNextPage,
    } = useInfiniteQuery(['glasses', filter, params.id], fetchGlasses, {
        getNextPageParam: (lastPage, pages) => lastPage.next, cacheTime: 0
    });
    const handleColorChange = (e: ChangeEvent) => {
        let target = (e.target as HTMLInputElement);
        let configurationName: string;
        console.log(target.value);
        if (target.name === 'color') {
            configurationName = 'filters[glass_variant_frame_variant_colour_tag_configuration_names][]=';
        } else {
            configurationName = 'filters[glass_variant_frame_variant_frame_tag_configuration_names][]=';
        }

        if (target.checked) {
            setFilter([...filter, `${configurationName}${target.value}`]);
            return;
        }
        let newFilter = filter.filter((item, index) => {
            return item !== `${configurationName}${target.value}`;
        });
        setFilter(newFilter);
    }
    const prepareUrl = (pageParam: number, param_id: string) => {
        let baseUrl = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${param_id}/glasses?page[limit]=${LIMIT.current}&page[number]=${pageParam}`;
        filter.forEach((item, index) => {
            baseUrl = baseUrl + '&' + item;
        })
        return baseUrl;
    }
    return (<>

        <section>
            <article className={styles.filters}>
                <h2 className={styles.filtersMainHeading}>filters</h2>
                <article className={styles.options}>
                    <section className={styles.colors}>
                        <h3 className={styles.filterSubHeader}>
                            color:
                        </h3>
                        <div className={styles.filterOptions}>
                            <div className={styles.checkbox}>
                                <input id={'black'} type={'checkbox'} name={'color'} value={'black'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="black">black</label>

                            </div>
                            <div className={styles.checkbox}>
                                <input id={'tortoise'} type={'checkbox'} name={'color'} value={'tortoise'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="tortoise">tortoise</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'coloured'} type={'checkbox'} name={'color'} value={'coloured'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="coloured">coloured</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'crystal'} type={'checkbox'} name={'color'} value={'crystal'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="crystal">crystal</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'bright'} type={'checkbox'} name={'color'} value={'bright'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="bright">bright</label>
                            </div>
                        </div>
                    </section>
                    <section className={styles.frames}>
                        <h3 className={styles.filterSubHeader}>
                            frame:
                        </h3>
                        <div className={styles.filterOptions}>
                            <div className={styles.checkbox}>
                                <input id={'square'} type={'checkbox'} name={'frame'} value={'square'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="square">square</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'rectangle'} type={'checkbox'} name={'frame'} value={'rectangle'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="rectangle">rectangle</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'cat-eye'} type={'checkbox'} name={'frame'} value={'cat-eye'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="cat-eye">cat-eye</label>
                            </div>
                            <div className={styles.checkbox}>
                                <input id={'round'} type={'checkbox'} name={'frame'} value={'round'}
                                       onChange={(e) => handleColorChange(e)}/>
                                <label htmlFor="round">round</label>
                            </div>
                        </div>
                    </section>
                </article>
            </article>
            {data?.pages.map((item: any, index: any) => (<InfiniteScroll
                dataLength={item ? item.glasses.length : 0}
                next={() => fetchNextPage()}
                hasMore={!!hasNextPage}
                loader={<Loading/>}
                className={styles.glasses}
            >
                {item.glasses.map((g: GlassItemInterface) => (<div className={styles.glass}>
                    {<Glass glass={g}/>}
                </div>))}
            </InfiniteScroll>))}
        </section>
    </>);
};
export default Collection;
