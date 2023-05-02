import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav as Navs,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Nav(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // className="p-5 shadow p-3 mb-5 bg-body-tertiary rounded

  return (
    <div className="shadow p-4 mb-5 bg-body-tertiary rounded position-relative">
      <Navbar {...args}>
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <Navs className="me-auto fs-4 nav-fullscreem">
          <NavItem>
            <NavLink active>
              <Link to={"/"} className="text-decoration-none">
                Clientes
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to={"/cadastro"} className="text-decoration-none">
                Cadastro
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Pagamentos</NavLink>
          </NavItem>
        </Navs>
        <NavbarToggler
          onClick={toggle}
          className="toggle-navbar"
          style={{ display: "none" }}
        >
          <i className="bi bi-list"></i>
        </NavbarToggler>
        <Collapse
          isOpen={isOpen}
          navbar
          className="position-absolute top-100 start-20 translate-middle-x bg-light p-3"
        >
          <Navs className="me-auto" navbar>
            <NavItem>
              <NavLink active href="/">
                Clientes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={"/cadastro"} className="teste">
                  Cadastro
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Pagamentos</NavLink>
            </NavItem>
          </Navs>
        </Collapse>
      </Navbar>
    </div>
  );
}
