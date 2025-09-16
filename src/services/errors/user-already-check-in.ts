export class UserAlreadyCheckInError extends Error {
  constructor() {
    super('User already checked in today.')
  }
}
