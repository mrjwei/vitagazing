import { useNotification } from "../context/NotificationContext";

export const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
      {notifications.map((msg, idx) => (
        <div
          key={idx}
          className="text-green-600 bg-white border-2 border-green-600 p-2 rounded shadow"
        >
          {msg}
        </div>
      ))}
    </div>
  );
};
