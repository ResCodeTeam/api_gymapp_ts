"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
//Rotas
const adminRoute_1 = require("./api/routes/adminRoute");
const authRoute_1 = require("./api/routes/authRoute");
const dotenv_1 = __importDefault(require("dotenv"));
const backendRoute_1 = require("./api/routes/backendRoute");
dotenv_1.default.config();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(express_1.default.json());
app.use("/api/v1/admin", adminRoute_1.adminRouter);
app.use("/api/v1/auth", authRoute_1.authRouter);
app.use("/api/v1/", backendRoute_1.backendRouter);
app.use((error, request, response, next) => {
    console.log(error);
    return response.json({
        status: "Error",
        message: error.message
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running! on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map