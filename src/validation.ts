const validation = {
    login:{
        email: {
            required:"Username required"
        },
        password:{
            required: "Password required",
            minLength : {value:4 , message:"Username must be between 4 and 10"},
            maxLength : {value:10 , message:"Username must be between 4 and 10"},
        }
    },
    register:{
        email: {
            required: "Email required"
        },
        username:{
            required: "Username required",
            minLength : {value:4 , message:"Username must be between 4 and 10"},
            maxLength : {value:10 , message:"Username must be between 4 and 10"},
        },
        password:{
            required: "Password required",
            minLength : {value:4 , message:"Password must be between 4 and 10"},
            maxLength : {value:10 , message:"Password must be between 4 and 10"},
        }
    },
    post:{
            title: {
                required:"This field is required",
                minLength:{value:4 , message:"The post subject must be between 4 and 50"},
                maxLength:{value:50 , message:"The post subject must be between 4 and 50"},
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
            minLength : {value:4 , message:"Username must be between 4 and 10"},
            maxLength : {value:10 , message:"Username must be between 4 and 10"},
        },
        password:{
            minLength : {value:4 , message:"Password must be between 4 and 10"},
            maxLength : {value:10 , message:"Password must be between 4 and 10"},
        }
    }
}

export default validation;