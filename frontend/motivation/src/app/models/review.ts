export class Review {
  constructor(
    public profile: string,
    public service: string,
    public task_description: string,
    public rating: number,
    public reviewed_by: string,
    public reviewed_on: Date,
    public review:string,

  )
  {

  }

}
