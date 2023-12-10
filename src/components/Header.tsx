import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from 'assets/back-arrow.png';

interface HeaderProps extends PropsWithChildren {
  backButton?: boolean;
}

export default function Header({ backButton, children, ...props }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <h2
      css={{
        width: '100%',
        maxWidth: '42.375rem',
        margin: '0 auto',
        position: 'relative',
        fontFamily: 'NanumSquareAcb',
        fontSize: '1.875rem',
      }}
      {...props}
    >
      {backButton && (
        <button
          css={{
            display: 'block',
            width: '1.875rem',
            height: '1.875rem',
            background: `url(${backArrow})`,
            backgroundSize: '1.875rem 1.875rem',
            border: 'none',
            position: 'absolute',
            top: '50%',
            left: '5px',
            transform: 'translateY(-50%)',
          }}
          type='button'
          onClick={() => navigate(-1)}
        />
      )}
      {children}
    </h2>
  );
}
