import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(Logout());
  };
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Krisi Sheba Kendro</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo && userInfo.isAdmin ? (
                <>
                  <Navbar>
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar>
                  <Navbar>
                    <LinkContainer to="/products">
                      <NavDropdown.Item>Products </NavDropdown.Item>
                    </LinkContainer>
                  </Navbar>
                  <Navbar>
                    <LinkContainer to="/users">
                      <NavDropdown.Item>Users </NavDropdown.Item>
                    </LinkContainer>
                  </Navbar>

                  <Navbar>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Orders </NavDropdown.Item>
                    </LinkContainer>
                  </Navbar>
                </>
              ) : userInfo && !userInfo.isAdmin ? (
                <>
                  <Navbar>
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar>
                  <Navbar>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i> Cart
                      </Nav.Link>
                    </LinkContainer>
                  </Navbar>
                </>
              ) : (
                <>
                  <Navbar>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-sign-in-alt"></i> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  </Navbar>
                  <Navbar>
                    <LinkContainer to="/users/create">
                      <Nav.Link>
                        <i className="fas fa-user-plus"></i> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </Navbar>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
