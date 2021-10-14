import { Category } from "./category";
import { StudentUser } from "./student-user";

export class Profile {

  constructor(
    public user: StudentUser,
    public profile_photo: string,
    public role: string,
    public phone_number: string,
    public profile_email: string,
    public category: Category,
    public created_at:Date,


    )
    {
    }
}

