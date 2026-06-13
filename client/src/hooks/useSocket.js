import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export function useSocket(onUpdate) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ['websocket', 'polling'] });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

    socketRef.current.on('matches:updated', () => {
      console.log('Matches updated from live feed');
      onUpdate?.();
    });

    socketRef.current.on('milestone:fifty', (data) => {
      console.log('FIFTY!', data);
    });

    socketRef.current.on('milestone:century', (data) => {
      console.log('CENTURY!', data);
    });

    socketRef.current.on('milestone:fiveWickets', (data) => {
      console.log('5 WICKET HAUL!', data);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [onUpdate]);

  return socketRef;
}
