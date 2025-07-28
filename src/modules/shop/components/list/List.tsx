import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetRecordsQuery } from 'api/apiSlice';
import type { Cat } from 'types/types';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, CircularProgress } from '@mui/material';
import LargeCard from 'components/ProductCard/LargeCard';
import styles from './List.module.css';
import {
  ITEMS_BY_PAGE_LIMIT,
  TOTAL_PAGES_AMOUNT,
} from 'modules/shop/components/list/consts';

const List = () => {
  const [items, setItems] = useState<Cat[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useGetRecordsQuery({
    limit: ITEMS_BY_PAGE_LIMIT,
    page,
  });

  useEffect(() => {
    if (data && data.length) {
      setItems((prev) => [...prev, ...data]);

      if (page < TOTAL_PAGES_AMOUNT) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [data, page]);

  const fetchData = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <Grid size={12} container spacing={3} className={styles.displayWrapper}>
        <CircularProgress color="primary" />
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid size={12} container spacing={3} className={styles.displayWrapper}>
        <Typography variant="body1">Error</Typography>
      </Grid>
    );
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      height="80vh"
      loader={
        <Grid
          container
          size={12}
          spacing={3}
          className={styles.messagesWrapper}
        >
          <CircularProgress color="primary" />
        </Grid>
      }
      endMessage={
        <Grid
          container
          size={12}
          spacing={3}
          className={styles.messagesWrapper}
        >
          <Typography variant="body1">All cats shown</Typography>
        </Grid>
      }
    >
      <Grid container size={12} spacing={3}>
        {items.map((record: Cat) => (
          <Grid
            key={record.id}
            size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
            container
            className="display-center"
          >
            <LargeCard cat={record} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default List;
