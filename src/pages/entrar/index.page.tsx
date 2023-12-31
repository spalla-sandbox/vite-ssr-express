import LoginForm from '../../components/LoginForm';
import { defineGuestPage } from '../../page';
import MainTemplate from '../../templates/MainTemplate';

export default defineGuestPage(
  () =>
    function EntrarPage() {
      return (
        <MainTemplate>
          <article className='grid'>
            <div>
              <hgroup>
                <h1>Sign in</h1>
                <h2>A minimalist layout for Login pages</h2>
              </hgroup>
              <LoginForm />
            </div>
            <div />
          </article>
        </MainTemplate>
      );
    },
);
