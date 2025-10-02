import { useEffect } from "react";
import socket from "../socket";
import { useNotification } from "../context/NotificationContext";

export const GlobalNotifier = () => {
  const { addNotification } = useNotification();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    socket.on("resumeCreated", (data) => {
      console.log("Received resumeCreated event:", data);
      addNotification(data.message);
    });

    return () => socket.off("resumeCreated");
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

  return null;
}
