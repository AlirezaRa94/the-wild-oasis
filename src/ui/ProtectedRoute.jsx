import styled from "styled-components";
import propTypes from "prop-types";

import Spinner from "./Spinner";

import { useGetUser } from "../features/authentication/useGetUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

ProtectedRoute.propTypes = {
  children: propTypes.node,
};

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending: isGettingUser, isAuthenticated } = useGetUser();

  // 2. If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) {
      navigate("/login");
    }
  }, [isAuthenticated, isGettingUser, navigate]);

  // 3. While loading, show a spinner
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If the user is authenticated, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
