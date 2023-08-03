import Button from '../../../../components/Button';
import Dropdown from '../Dropdown';
import { NavBar, NavBarMenu, NavBarMenuItem } from './styles';

export default function TopBar() {
  return (
    <NavBar className='container-fluid'>
      <NavBarMenu>
        <NavBarMenuItem>
          <a href='./' className='contrast' data-id='brand'>
            <strong>Brand</strong>
          </a>
        </NavBarMenuItem>
      </NavBarMenu>
      <NavBarMenu>
        <Button type='button' data-id='logout' className='contrast none'>
          Logout
        </Button>
        <NavBarMenuItem>
          <Dropdown.Dropdown role='list' dir='rtl'>
            <Dropdown.Summary
              aria-haspopup='listbox'
              role='link'
              className='contrast'
            >
              Temas
            </Dropdown.Summary>
            <Dropdown.List role='listbox'>
              <Dropdown.Item>
                <a href='/' data-theme-switcher='auto'>
                  Auto
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href='/' data-theme-switcher='light'>
                  Light
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href='/' data-theme-switcher='dark'>
                  Dark
                </a>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Dropdown>
        </NavBarMenuItem>
        <NavBarMenuItem>
          <Dropdown.Dropdown role='list' dir='rtl'>
            <Dropdown.Summary
              aria-haspopup='listbox'
              role='link'
              className='contrast'
            >
              Exemplos
            </Dropdown.Summary>
            <Dropdown.List role='listbox'>
              <Dropdown.Item>
                <a href='/'>Home</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href='/entrar'>Login</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href='/restrito'>Acesso restrito</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href='/com-parametro/xpto?search=query'>
                  Página com parâmetros
                </a>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Dropdown>
        </NavBarMenuItem>
      </NavBarMenu>
    </NavBar>
  );
}
