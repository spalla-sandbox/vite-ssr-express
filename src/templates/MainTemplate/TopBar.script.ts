import Cookie from 'js-cookie';

document.querySelector<HTMLButtonElement>('[data-id="brand"').onclick = e => {
  e.preventDefault();
  console.log('Click', e.target);
};

document.querySelector<HTMLButtonElement>('[data-id="logout"').onclick = e => {
  e.preventDefault();
  console.log('logout');
  Cookie.remove('token');
  document.location.href = '/';
};

if (Cookie.get('token')) {
  document
    .querySelector<HTMLButtonElement>('[data-id="logout"')
    .classList.remove('none');
}

export default 'Topbar script';
