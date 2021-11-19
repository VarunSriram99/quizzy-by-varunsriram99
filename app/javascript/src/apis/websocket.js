import Logger from "js-logger";

const socketConnection = setIsLoading => {
  const socket = new WebSocket(`ws://${window.location.host}/cable`);
  socket.onopen = () => {
    Logger.log("connected");
    socket.send(
      '{"command":"subscribe","identifier":"{\\"channel\\":\\"NotificationChannel\\"}"}'
    );
    socket.onmessage = event => {
      Logger.log(event.data);
      Logger.log(JSON.parse(event.data)["message"]);
      if (JSON.parse(event.data)["message"] == "Excel complete") {
        socket.close();
        setIsLoading(false);
      }
    };
  };
};

export default socketConnection;
