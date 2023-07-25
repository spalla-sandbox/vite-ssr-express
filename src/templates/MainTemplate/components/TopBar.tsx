export default function TopBar() {
  return (
    <nav class='container-fluid'>
      <ul>
        <li>
          <a href='./' class='contrast' btn-id='brand'>
            <strong>Brand</strong>
          </a>
        </li>
      </ul>
      <ul>
        <button btn='logout' class='contrast none'>
          Logout
        </button>
        <li>
          <details role='list' dir='rtl'>
            <summary aria-haspopup='listbox' role='link' class='contrast'>
              Temas
            </summary>
            <ul role='listbox'>
              <li>
                <a href='#' data-theme-switcher='auto'>
                  Auto
                </a>
              </li>
              <li>
                <a href='#' data-theme-switcher='light'>
                  Light
                </a>
              </li>
              <li>
                <a href='#' data-theme-switcher='dark'>
                  Dark
                </a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details role='list' dir='rtl'>
            <summary aria-haspopup='listbox' role='link' class='contrast'>
              Exemplos
            </summary>
            <ul role='listbox'>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/entrar'>Login</a>
              </li>
              <li>
                <a href='/restrito'>Acesso restrito</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
