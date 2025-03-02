import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Item from './Item';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchLaunches } from '../services';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLaunches = launches.filter((launch) =>
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    fetchLaunches(page)
      .then((res) => {
        setLaunches(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    setLoading(true);
    fetchLaunches(page)
      .then((res) => {
        setLaunches((prevItems) => [...prevItems, ...res]);
        res.length > 0 ? setHasMore(true) : setHasMore(false);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='container'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div
        id='scrollableDiv'
        className='launch__wrapper'
      >
        {filteredLaunches && (
          <InfiniteScroll
            dataLength={filteredLaunches.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollThreshold={1}
            height={700}
            endMessage={<div className='max-reached'>End of list.</div>}
            scrollableTarget='scrollableDiv'
            style={{ padding: '20px 10px' }}
          >
            <div className='launch__list'>
              {filteredLaunches &&
                filteredLaunches.map((launch, index) => (
                  <Item
                    launch={launch}
                    key={`${launch.flight_number}-${index}`}
                  />
                ))}
            </div>
          </InfiniteScroll>
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default App;
