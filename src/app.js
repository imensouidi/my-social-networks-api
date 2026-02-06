const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const discussionRoutes = require("./routes/discussion.routes");
const messageRoutes = require("./routes/message.routes");


app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", require("./routes/auth.routes"));
app.use("/groups", require("./routes/group.routes"));
app.use("/events", require("./routes/event.routes"));
app.use("/polls", require("./routes/poll.routes"));
app.use("/tickets", require("./routes/ticket.routes"));
app.use("/shopping", require("./routes/shopping.routes"));
app.use("/carpool", require("./routes/carpool.routes"));
app.use("/discussions", discussionRoutes);
app.use("/messages", messageRoutes);



module.exports = app;
