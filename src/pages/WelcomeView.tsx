import Card from 'components/Card';
import Form from 'components/WelcomeView/Form';
import Greetings from 'components/WelcomeView/Greetings';
import Link from 'components/WelcomeView/Link';
import Logo from 'components/WelcomeView/Logo';
import Title from 'components/WelcomeView/Title';

export default function WelcomeView() {
  return (
    <main css={{ overflow: 'auto' }} id='welcome'>
      <Card css={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
        <Title />
        <Logo />
        <Greetings />
        <Form />
        <Link />
      </Card>
    </main>
  );
}
