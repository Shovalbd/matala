import axios from "axios";

const server = "http://localhost:3004";

export function GET(url:string){
    let token = sessionStorage.getItem("token") || "";
    return axios.get(server+url , {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export function POST(url:string,data:any){
    let token = sessionStorage.getItem("token") || "";
    return axios.post(server+url , data , {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export function PUT(url:string,data:any){
    let token = sessionStorage.getItem("token") || "";
    return axios.put(server+url ,data, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export function DELETE(url:string){
    let token = sessionStorage.getItem("token") || "";
    return axios.delete(server+url , {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}