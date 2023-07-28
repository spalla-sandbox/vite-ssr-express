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
        autoComplete='nickname'
        required
        id='email'
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        aria-label='Password'
        autoComplete='current-password'
        required
        id='pass'
      />
      <fieldset>
        <label htmlFor='remember'>
          <input type='checkbox' role='switch' id='remember' name='remember' />
          Remember me
        </label>
      </fieldset>
      <button type='submit' className='contrast'>
        Login
      </button>
    </form>
  );
}
