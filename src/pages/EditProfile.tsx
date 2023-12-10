import Form from 'components/EditProfile/Form';
import Header from 'components/Header';
import { color } from 'style/color';

export default function EditProfile() {
  return (
    <main
      id='edit-profile'
      css={{
        background: color.basicCard,
        padding: '4.375rem 0',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Header backButton>프로필 설정</Header>
      <Form />
    </main>
  );
}
