import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Glass from "../../components/Glass";
import {GlassItemInterface} from "../../interfaces/glass-item.interface";
import styles from '../../assets/modules/Collection.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../components/Loading';

const Collection = () => {
    const params = useParams();
    const n = useNavigate();
    function getUrl(pageParam: number) {
        let url = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-women/glasses?page[limit]=${LIMIT.current}&page[number]=${pageParam}&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic`;
        switch (params.id) {
            case "spectacles-men":
            case "spectacles-women":
                url = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${params.id}/glasses?page[limit]=${LIMIT.current}&page[number]=${pageParam}&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic`;
                break;
            case "sunglasses-men":
            case "sunglasses-women":
                url = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${params.id}/glasses?page[limit]=${LIMIT.current}&page[number]=${pageParam}&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic`;
                break;
            default:
                n("/");
                break;
        }
        return url;
    }
    const LIMIT = useRef(12);
    const fetchGlasses = async ({ pageParam = 1 }) => {
        return await fetch(getUrl(pageParam))
            .then((res) => res.json())
            .then((res) => {
                res.next =
                    pageParam * LIMIT.current < res.meta.total_count
                        ? pageParam + 1
                        : undefined;
                return res;
            });
    };

    const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
        useInfiniteQuery("glasses", fetchGlasses, {
            getNextPageParam: (lastPage, pages) => lastPage.next,
        });
    return (
        <>

            <div>
                {data?.pages.map((item: any, index: any) => (
                        <InfiniteScroll
                            dataLength={item ? item.glasses.length : 0}
                            next={() => fetchNextPage()}
                            hasMore={!!hasNextPage}
                            loader={<Loading/>}
                            className={styles.glasses}
                        >
                            {item.glasses.map((g: GlassItemInterface) => (
                                <div className={styles.glass}>
                                    {<Glass glass={g}/>}
                                </div>
                            ))}
                        </InfiniteScroll>
                ))}
            </div>
        </>
    );
};
export default Collection;
