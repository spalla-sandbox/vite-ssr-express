import Cookie from 'js-cookie';

document.querySelector<HTMLFormElement>('#login-form').onsubmit = e => {
  e.preventDefault();
  Cookie.set('token', 1);
  window.location.reload();
};
