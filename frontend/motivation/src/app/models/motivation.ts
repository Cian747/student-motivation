import { Category } from "./category";
import { Profile } from "./profile";
export class Motivation {
  id: any;
  constructor(
    public image: string,
    public video: string,
    public title: string,
    public category: Category,
    public description: string,
    public profile:Profile,
    public created_at:Date,


    )
    {
    }

}

