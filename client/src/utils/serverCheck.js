/**
 * Server Connection Utility
 * 
 * This utility provides functions to check if the backend server is running
 * and accessible. Used to diagnose network errors during API requests.
 */

import axios from 'axios';

/**
 * Check if the server is running and accessible
 * @returns {Promise<boolean>} True if the server is accessible, false otherwise
 */
export const checkServerConnection = async () => {
  // Try multiple endpoints to see if any are responding
  const endpointsToTry = [
    'http://localhost:5000/health',
    'http://localhost:5000/api/v1/test',
    'http://127.0.0.1:5000/health'
  ];
  
  // Try each endpoint to see if any respond
  for (const endpoint of endpointsToTry) {
    try {
      await axios.get(endpoint, { 
        timeout: 3000,
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log(`Server connection successful at ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`Failed to connect to ${endpoint}:`, error.message);
      // Continue to the next endpoint
    }
  }
  
  // If we get here, all endpoints failed
  console.error("All server connection attempts failed");
  return false;
};

/**
 * Get a user-friendly error message for network errors
 * @param {Error} error - The error object from an API call
 * @returns {string} A user-friendly error message
 */
export const getNetworkErrorMessage = (error) => {
  if (error.code === "ERR_NETWORK") {
    return "Cannot connect to server. Please ensure the server is running at http://localhost:5000. Try refreshing the page or restarting the server.";
  } else if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return "An unexpected error occurred";
  }
}; 