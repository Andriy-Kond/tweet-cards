export const Dropdown = ({ onSelect }) => {
  const handleSelect = event => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleSelect}>
      <option value="all">Show all</option>
      <option value="follow">Follow</option>
      <option value="followings">followings</option>
    </select>
  );
};
