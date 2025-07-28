import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetRecordsQuery } from 'api/apiSlice.ts';
import type { Cat } from 'types/types.ts';
import Card from 'modules/shop/components/list/components/card/Card.tsx';
import { useState, useEffect } from 'react';

const List = () => {
  const limit = 10;
  const pagesLimit = 6;
  const [items, setItems] = useState<Cat[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading, isError, isFetching } = useGetRecordsQuery({
    limit,
    page,
  });

  useEffect(() => {
    if (data && data.length) {
      setItems((prev) => [...prev, ...data]);

      if (page < pagesLimit) {
        console.log(page, '1');
        setHasMore(true);
      } else {
        console.log(page, '2');
        setHasMore(false);
      }
    }
  }, [data]);

  const fetchData = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all</b>
        </p>
      }
    >
      {items.map((record: Cat) => (
        <Card key={record.id} cat={record} />
      ))}
    </InfiniteScroll>
  );
};

export default List;
