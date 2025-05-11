const validation = {
    login:{
        email: {
            required: "חובה לרשום שם משתמש"
        },
        password:{
            required: "חובה לרשום סיסמה",
            minLength : {value:4  , message:"שם משתמש חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"שם משתמש חייב להיות בין 4 ל 10"},
        }
    },
    register:{
        email: {
            required: "חובה לרשום מייל"
        },
        username:{
            required: "חובה לרשום שם משתמש",
            minLength : {value:4  , message:"שם משתמש חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"שם משתמש חייב להיות בין 4 ל 10"},
        },
        password:{
            required: "חובה לרשום סיסמא",
            minLength : {value:4  , message:"סיסמה חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"סיסמה חייב להיות בין 4 ל 10"},
        }
    },
    post:{
            title: {
                required:"שדה זה חובה",
                minLength:{value:4  , message:"נושא הפוסט חייב להיות בין 4 ל ר50"},
                maxLength:{value:50 , message:"נושא הפוסט חייב להיות בין 4 ל ר50"},
            },
            content: {
                required:"שדה זה חובה",
            }
    },
    comment:{
        content: {
            required:"שדה זה חובה",
        }
    },
    profile:{
        username:{
            required: "חובה לרשום שם משתמש",
            minLength : {value:4  , message:"שם משתמש חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"שם משתמש חייב להיות בין 4 ל 10"},
        },
        password:{
            minLength : {value:4  , message:"סיסמה חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"סיסמה חייב להיות בין 4 ל 10"},
        }
    }
}

export default validation;