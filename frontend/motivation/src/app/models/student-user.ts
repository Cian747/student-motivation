export class StudentUser {

  constructor(
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public role: string,
    public is_superuser: boolean,
    public is_staff: boolean,
    public is_active:boolean,
    public created_at:Date,
    public token: string,


    )
    {
    }
}


