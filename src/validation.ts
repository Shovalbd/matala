const validation = {
    login:{
        email: {
            required:"Email required"
        },
        password:{
            required: "Password required",
            minLength : {value:4 , message:"Password must be 4-10 characters long"},
            maxLength : {value:10 , message:"Password must be 4-10 characters long"},
        }
    },
    register:{
        email: {
            required: "Email required"
        },
        username:{
            required: "Username required",
            minLength : {value:4 , message:"Username must be 4-10 characters long"},
            maxLength : {value:10 , message:"Username must be 4-10 characters long"},
        },
        password:{
            required: "Password required",
            minLength : {value:4 , message:"Password must be 4-10 characters long"},
            maxLength : {value:10 , message:"Password must be 4-10 characters long"},
        }
    },
    post:{
            title: {
                required:"This field is required",
                minLength:{value:4 , message:"The post subject must be 4-50 characters long"},
                maxLength:{value:50 , message:"The post subject must be 4-50 characters long"},
            },
            content: {
                required:"This field is required",
            }
    },
    comment:{
        content: {
             required:"This field is required",
        }
    },
    profile:{
        username:{
            required: "Username required",
            minLength : {value:4 , message:"Username must be 4-10 characters long"},
            maxLength : {value:10 , message:"Username must be 4-10 characters long"},
        },
        password:{
            minLength : {value:4 , message:"Password must be 4-10 characters long"},
            maxLength : {value:10 , message:"Password must be 4-10 characters long"},
        }
    }
}

export default validation;