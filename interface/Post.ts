export default interface Post{
    _id:string;
    owner:{
        _id:string;
        username:string;
    };
    content:string;
    title:string;
    likes:string[];
}