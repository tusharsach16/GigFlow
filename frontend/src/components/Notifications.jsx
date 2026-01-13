import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket, {connectSocket, disconnectSocket} from '../utils/socket';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      connectSocket(user._id);

      socket.on('hired', (data) => {
        toast.success(
          <div onClick={() => navigate(`/gigs/${data.gigId}`)}>
            <p className="font-bold">🎉 You've been hired!</p>
            <p>{data.message}</p>
            <p className="text-sm text-gray-600 mt-1">Click to view details</p>
          </div>,
          {
            autoClose: 10000,
            onClick: () => navigate(`/gigs/${data.gigId}`)
          }
        );
      });

      return () => {
        socket.off('hired');
        disconnectSocket();
      };
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default Notifications;