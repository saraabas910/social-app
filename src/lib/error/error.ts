export class AppError extends Error{
  
    statusCode:number;
    isOpertional:boolean;

    constructor(message:string ,  statusCode:number,  isOpertional:boolean=true){
        super(message)
        this.statusCode=statusCode;
        this.isOpertional=isOpertional
        Error.captureStackTrace(this,this.constructor);
    }

}