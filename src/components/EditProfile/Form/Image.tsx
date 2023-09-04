import { PropsWithChildren, useState } from 'react';
import { ProfileImage } from 'api/type/user';
import { position } from 'style/position';
import sprites from 'assets/profile-image-sprites.png';
import modifyIcon from 'assets/modify-icon.svg';
import Modal from './Image/Modal';
import Button from 'components/Button';

interface Props extends PropsWithChildren {
  imageIndex: ProfileImage;
}
export default function Image({ imageIndex }: Props) {
  const [isModal, setIsModal] = useState<boolean>(false);

  const modalHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'DIV') return;
    event.stopPropagation();
    setIsModal(!isModal);
  };

  return (
    <figure
      css={{
        width: '6.5625rem',
        height: '6.5625rem',
        position: 'relative',
        margin: '3px auto',
        background: '#d9d9d9',
        outline: '3px solid rgba(0, 0, 0, 0.4)',
        borderRadius: '50%',
      }}
      onClick={modalHandler}
    >
      <Button
        variant='custom'
        css={{
          width: '1.375rem',
          height: '1.375rem',
          borderRadius: '0.3125rem',
          position: 'absolute',
          top: 0,
          right: 0,
          background: `url(${modifyIcon})`,
          backgroundSize: '1.375rem 1.375rem',
          backgroundRepeat: 'no-repeat',
          zIndex: 500,
          outline: '0.1875rem solid rgba(0, 0, 0, 0.5)',
        }}
      />
      <div
        css={{
          background: `url(${sprites}) ${position[imageIndex].top} ${position[imageIndex].left}`,
          backgroundSize: '19.6875rem 19.6875rem',
          width: '100%',
          height: '100%',
        }}
      ></div>
      <Modal isModal={isModal} />
    </figure>
  );
}
