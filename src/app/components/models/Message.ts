export class Message {

constructor(name: string, email: string, sub: string, msg: string){
    this.name = name;
    this.email = email;
    this.subject = sub;
    this.message = msg;
}

    public name: string;
    public email: string;
    public subject: string;
    public message: string;
}