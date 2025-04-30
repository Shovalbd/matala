export default interface Comment{
    _id:string;
    owner:{
        _id:string;
        username:string;
    };
    postid:string;
    comment:string;
}