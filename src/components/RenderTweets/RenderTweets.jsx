import { MarkupTweets } from 'components/MarkupTweets/MarkupTweets';
import css from './RenderTweets.module.css';

export const RenderTweets = props => {
  const { tweets } = props;

  return (
    <ul className={css.cardsList}>
      {tweets.map(({ id, ...props }) => {
        return <MarkupTweets key={id} id={id} {...props}></MarkupTweets>;
      })}
    </ul>
  );
};
