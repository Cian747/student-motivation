export class Users {
  constructor(
    public id: 'number',
    public username:'string',
    public email:'string',
    public password: 'string',
    public is_superuser: 'boolean',
    public role: 'string',
    public is_active:'boolean'
  ){}
}
