import Logger from "js-logger";

const socketConnection = (setIsLoading, setLoadingMessage) => {
  const socket = new WebSocket(`wss://${window.location.host}/cable`);
  socket.onopen = () => {
    Logger.log("connected");
    socket.send(
      '{"command":"subscribe","identifier":"{\\"channel\\":\\"NotificationChannel\\"}"}'
    );
    socket.onmessage = ({ data }) => {
      if (
        JSON.parse(data)["identifier"] == '{"channel":"NotificationChannel"}' &&
        JSON.parse(data)["message"]
      ) {
        setLoadingMessage(JSON.parse(data)["message"]);
        if (JSON.parse(data)["message"] == "Excel complete") {
          socket.close();
          setIsLoading(false);
        }
      }
    };
  };
};
export default socketConnection;
