import { Meal } from "./Meal";

export class Reserve{
    constructor(
        public  ID:number,
        public  Number_of_guests :number,
        public  Date :Date,
        public  Special_requests :string,
        public  UserID :string,
        public  Meals:Meal[],
       
    ){}
}