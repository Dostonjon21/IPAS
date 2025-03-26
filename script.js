'use strict'
const API = 'https://reqres.in/api/users';
const userListDiv = document.getElementById('userList');
const message = document.getElementById('message');
const createUserBtn = document.getElementById('createUser');
const updateBtn=document.querySelector('.update-btn')
let user=[]

const updateUser=(id,name,job)=>{
    console.log(id,name,job);
    
}
const createUser = async () => {
    const name = document.getElementById('name').value;
    const job = document.getElementById('job').value;

    if (!name || !job) {
        message.textContent = `Iltimos, to'liq ma'lumot kiriting`;
        return
        
    }else{
        
            message.textContent=`Ma'lumotla yuborilmoqda...` 
        setTimeout(() => {
            message.textContent=''
        }, 2000);
    }

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, job })
        });

        

        const data = await response.json();
        user.push(data)

    console.log(user);
    userList(data.id,data.name,data.job)
        

    } catch  {
        message.textContent = `Xatolik yuz berdi`;
    }
};
const upDateFunction=async ()=>{
    const name=document.getElementById('name').value
    const job=document.getElementById('job').value
    const id=document.getElementById('userId').value
    if(name==='' || job==='' || id===''){
        message.textContent='Iltimos id, ismingiz va kasbingizni kriting'
    }else{
        try {
            message.textContent=`Ma'lumotlar yangilanmoqda...`
            await fetch(`${API}/${id}`,{
                method:"Put",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, job })
            
            })
            message.textContent=`Ma'lumotlar yangilandi!`
            userList()
        } catch  {
            message.textContent='Xato'
        }
    }
}
createUserBtn.addEventListener('click', createUser);
updateBtn.addEventListener('click',upDateFunction);
const  userList =()=>{
    setTimeout(() => {
        userListDiv.innerHTML=''
    user.forEach((item)=>{
        userListDiv.innerHTML+=`
        <div class='user-card'>
        <p>Id: ${item.id}</p>
        <p>Name: ${item.name}</p>
        <p>Work: ${item.job}</p>
        <button class='delete-btn'>D</button>
        </div>
        `
    })
    }, 2000);
}
const deletebtn=document.querySelector('.delete-btn')
console.log(deletebtn);