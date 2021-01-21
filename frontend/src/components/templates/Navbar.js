import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import UserService from '../../services/UserService'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()
  const toggle = () => setIsOpen(!isOpen);
  if(props.loggedIn)
  return (
    <div>
      <Navbar className="light" dark expand="md">
        <NavbarBrand href="/">NaukriSearch</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav ml-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={async () => {
                await UserService.logout()
                .then(r => props.reloadHook())
              }} >Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
  else
  return (
    <div>
      <Navbar color="light" dark  expand="md">
        <NavbarBrand href="/">NaukriSearch</NavbarBrand>
      </Navbar>
    </div>
  );

}

export default Example;
