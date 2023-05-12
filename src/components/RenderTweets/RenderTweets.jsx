import { MarkupTweets } from 'components/MarkupTweets/MarkupTweets';

import { useSelector } from 'react-redux';
import { selectDownloadedTweets, selectIsLoading } from 'redux/selectors';
import css from './RenderTweets.module.css';

export const RenderTweets = props => {
  // const { currentTweets } = props;
  const isLoading = useSelector(selectIsLoading);

  const downloadedTweets = useSelector(selectDownloadedTweets);
  console.log('downloadedTweets:', downloadedTweets);

  return (
    <ul className={css.cardsList}>
      {/* {currentTweets.map(({ id, ...props }) => { */}
      {downloadedTweets.map(({ id, ...props }) => {
        return <MarkupTweets key={id} id={id} {...props}></MarkupTweets>;
      })}
    </ul>
  );
};
