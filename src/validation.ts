const validation = {
    login:{
        email: {
            required: "חובה לרשום מייל"
        },
        password:{
            required: "חובה לרשום מייל",
            minLength : {value:4  , message:"שם משתמש חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"שם משתמש חייב להיות בין 4 ל 10"},
        }
    },
    register:{
        email: {
            required: "חובה לרשום מייל"
        },
        username:{
            required: "חובה לרשום מייל",
            minLength : {value:4  , message:"שם משתמש חייב להיות בין 4 ל 10"},
            maxLength : {value:10 , message:"שם משתמש חייב להיות בין 4 ל 10"},
        },
        password:{
            required: "חובה לרשום מייל",
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
    }
}

export default validation;