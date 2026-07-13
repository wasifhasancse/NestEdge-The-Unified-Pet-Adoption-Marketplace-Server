"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jose_cjs_1 = require("jose-cjs");
const clientUrl = process.env.NEXT_CLIENT_URL || "http://localhost:3000";
const JWKS = (0, jose_cjs_1.createRemoteJWKSet)(new URL(`${clientUrl}/api/auth/jwks`));
const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const { payload } = await (0, jose_cjs_1.jwtVerify)(token, JWKS);
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(403).send({ message: "Forbidden" });
    }
};
exports.verifyToken = verifyToken;
