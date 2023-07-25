import { defineScripts } from '../../page';

export default function LoginForm() {
  defineScripts([
    {
      src: '@source(src/components/LoginForm/LoginForm.script.ts)',
    },
  ]);
  return (
    <form id='login-form'>
      <input
        type='text'
        name='login'
        placeholder='Login'
        aria-label='Login'
        autocomplete='nickname'
        required
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        aria-label='Password'
        autocomplete='current-password'
        required
      />
      <fieldset>
        <label for='remember'>
          <input type='checkbox' role='switch' id='remember' name='remember' />
          Remember me
        </label>
      </fieldset>
      <button type='submit' class='contrast'>
        Login
      </button>
    </form>
  );
}
