import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, successDelete]);

  const createUserHandler = () => {
    history.push(`/users/create`);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ? ')) {
      dispatch(deleteUser(id));
    }
  };
  return users ? (
    <>
      <Row>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createUserHandler}>
            <i className="fas fa-plus"></i> Create User
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Krisi Card Number</th>
              <th>District</th>
              <th>Thana</th>
              <th>NID</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                {!user.isAdmin ? (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto: ${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.krisiCardNumber}</td>
                    <td>{user.district}</td>
                    <td>{user.thana}</td>
                    <td>{user.nid}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <Link to={`/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </>
            ))}
          </tbody>
        </Table>
      )}
    </>
  ) : (
    <Loader />
  );
};

export default UserListScreen;
