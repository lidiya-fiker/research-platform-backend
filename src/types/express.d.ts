declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
export interface UserPayload {
  id: string; 
  email: string; 
}
