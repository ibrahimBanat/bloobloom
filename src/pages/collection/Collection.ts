import {useState} from "react";
import {useInfiniteQuery} from "react-query";


const Collection = () => {
    const [category, setCategory] = useState('spectacles');

    const fetchGlasses = async ({ pageParam = 2 }) => {
        console.log(pageParam);
        return await fetch(`https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-women/glasses?page[limit]=2&page[number]=${pageParam}`).then(res => res.json());
    }
    const {
        data, isLoading, fetchNextPage, hasNextPage, isFetching,
    } = useInfiniteQuery('glasses', fetchGlasses, {
        getNextPageParam: (lastPage, pages) => {
            console.log(lastPage, 'mark');
            console.debug(pages, 'pages')
            return {pageParam: 4};
        },
    })
    return (
        <>
          <div>
              {
                  data?.pages[0].glasses.map((item, index) => (
                      <div key={item.name + index}>{item.name}</div>
                  ))
              }
              <button onClick={() => fetchNextPage}>
                  fetch more
              </button>
          </div>
        </>
    )
}
export default Collection;
