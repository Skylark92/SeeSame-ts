import { useContext } from 'react';
import CommentContext from 'context/CommentContext';
import Button from 'components/Button';

export default function Header() {
  const context = useContext(CommentContext);
  const comments = context?.data;

  const closeHandler = () => {
    context?.setIsMore(false);
  };

  return (
    <header
      css={{
        width: '100%',
        height: '4.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        borderRadius: '1.25rem 1.25rem 0 0',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <h3 css={{ display: 'inline-block', fontSize: '1.25rem', flexGrow: 1 }}>
        <span css={{ fontFamily: 'NanumSquareAceb' }}>댓글</span>
        <small
          css={{
            fontSize: '1rem',
            color: '#aeaeae',
            paddingLeft: '0.6875rem',
          }}
        >
          {(comments ? comments.length : 0).toLocaleString()}
        </small>
      </h3>
      <Button variant='close' css={{ flexGrow: 0 }} onClick={closeHandler} />
    </header>
  );
}
