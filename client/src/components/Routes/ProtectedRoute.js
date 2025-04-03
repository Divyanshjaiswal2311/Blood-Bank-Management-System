/**
 * Protected Route Component
 * 
 * This component provides authentication protection for routes that
 * require a logged-in user. It verifies the user's authentication status
 * and redirects to the login page if not authenticated.
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";          // For dispatching Redux actions
import API from "../../services/API";               // API service for backend calls
import { getCurrentUser } from "../../redux/features/auth/authActions";  // Auth action
import { Navigate } from "react-router-dom";        // For redirection
import { toast } from "react-toastify";             // For error notifications

/**
 * ProtectedRoute Component
 * 
 * Wraps protected routes to ensure user authentication.
 * Fetches and validates current user data from the backend.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Protected content or redirect to login
 */
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  /**
   * Fetch current user data from the backend
   * Updates Redux state with user information or clears localStorage on failure
   */
  const getUser = async () => {
    try {
      // Get current user data from API
      const { data } = await API.get("/auth/current-user");
      if (data?.success) {
        // Update Redux state with user data
        dispatch(getCurrentUser(data));
      } else {
        throw new Error(data?.message || "Failed to get user data");
      }
    } catch (error) {
      // Clear authentication data and show error on failure
      localStorage.clear();
      toast.error(error.message || "Authentication failed");
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    getUser();
  }, [dispatch]); // Add dispatch as dependency

  // Check if user is authenticated by looking for token
  if (localStorage.getItem("token")) {
    // Render protected content if authenticated
    return children;
  } else {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
