// put all types in client in here

export interface UserContext {
  user: User | null;
}
export interface User {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}
