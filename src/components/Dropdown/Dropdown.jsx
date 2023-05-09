import { useDispatch, useSelector } from 'react-redux';
import { selectUsersFilter } from 'redux/selectors';
import {
  setCurrentPage,
  setFilteredTweets,
  setUsersFilter,
} from 'redux/sliceUserKey';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';
import Dropdown from 'react-dropdown-select';
import Notiflix from 'notiflix';

export const MyDropdown = () => {
  const dispatch = useDispatch();
  const userFilter = useSelector(selectUsersFilter);

  const setFilter = selectedOption => {
    dispatch(setCurrentPage(1));
    dispatch(setUsersFilter(selectedOption[0].value));
    dispatch(setFilteredTweets());
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
      style={{ width: '200px', backgroundColor: '#fff' }}
    />
  );
};
