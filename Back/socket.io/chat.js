const { createAmessageService, getAllMessagesService } = require("../Services/Chat");

module.exports = (io, socket) => {
    socket.on("send message", async (data) => {
        try {
            const { nickname, message } = data;
            await createAmessageService(nickname, message);
            io.emit("message sent");
        } catch (err) {
            console.error("Error sending message:", err);
            socket.emit("message_error", "Error sending message");
        }
    });

    socket.on("get messages", async () => {
        try {
            const result = await getAllMessagesService();
            io.emit("all messages", result);
        } catch (err) {
            console.error("Error fetching messages:", err);
            socket.emit("message_error", "Error fetching messages");
        }
    });
};
