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
        width: '7.625rem',
        height: '7.625rem',
        position: 'relative',
        margin: '0 auto',
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
          top: '1.125rem',
          right: '0.25rem',
          background: `url(${modifyIcon})`,
          backgroundSize: '1.375rem 1.375rem',
          backgroundRepeat: 'no-repeat',
          zIndex: 500,
          outline: '0.125rem solid rgba(0, 0, 0, 0.6)',
        }}
      />
      <div
        css={{
          background: `url(${sprites}) ${position[imageIndex].top} ${position[imageIndex].left}`,
          backgroundSize: '22.875rem 22.875rem',
          width: '100%',
          height: '100%',
        }}
      ></div>
      <Modal isModal={isModal} />
    </figure>
  );
}
