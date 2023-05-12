import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import {
  setCurrentPage,
  setFilteredTweets,
  setUsersFilter,
} from 'redux/sliceUsers';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';
import Dropdown from 'react-dropdown-select';
import Notiflix from 'notiflix';
import { useGetUsersQuery } from 'redux/tweetsApi';

export const MyDropdown = () => {
  const dispatch = useDispatch();
  const { data: allTweets } = useGetUsersQuery();
  const userFilter = useSelector(selectFilter);

  const setFilter = selectedOption => {
    dispatch(setCurrentPage(1));
    dispatch(setUsersFilter(selectedOption[0].value));
    dispatch(setFilteredTweets(allTweets));
    Notiflix.Notify.info(`Show ${selectedOption[0].value} users`);
  };

  const options = [
    { label: 'Show all', value: ALL },
    { label: 'Follow', value: FOLLOW },
    { label: 'Followings', value: FOLLOWING },
  ];

  return (
    <Dropdown
      options={options}
      values={[{ label: userFilter, value: userFilter }]}
      onChange={setFilter}
      placeholder="Select an option"
      style={{ maxWidth: '200px', backgroundColor: '#fff' }}
    />
  );
};
