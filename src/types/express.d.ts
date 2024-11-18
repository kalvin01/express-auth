import { userPayload } from "./user";

declare global {
    namespace Express {
        interface Request {
            user?: userPayload
        }
    }
}