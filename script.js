'use strict'
const API = 'https://reqres.in/api/users';
const userListDiv = document.getElementById('userList');
const message = document.getElementById('message');
const createUserBtn = document.getElementById('createUser');
const updateBtn = document.querySelector('.update-btn');
let users = [];

const createUser = async () => {
    const name = document.getElementById('name').value;
    const job = document.getElementById('job').value;

    if (!name || !job) {
        message.textContent = `Iltimos, to'liq ma'lumot kiriting`;
        return;
    }

    message.textContent = `Ma'lumotlar yuborilmoqda...`;

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, job })
        });

        const data = await response.json();
        users.push({ id: data.id, name, job }); 

        message.textContent = `Foydalanuvchi qo'shildi!`;
        renderUsers();
    } catch {
        message.textContent = `Xatolik yuz berdi`;
    }
};


const renderUsers = () => {
    userListDiv.innerHTML = '';
    users.forEach((item, index) => {
        userListDiv.innerHTML += `
            <div class='user-card'>
                <p>Id: ${item.id}</p>
                <p>Name: ${item.name}</p>
                <p>Work: ${item.job}</p>
                <button class='delete-btn' data-index="${index}">D</button>
            </div>
        `;
    });


    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            users.splice(index, 1); 
            renderUsers();
        });
    });
};


const updateUser = async () => {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const job = document.getElementById('job').value;

    if (!id || !name || !job) {
        message.textContent = 'Iltimos id, ismingiz va kasbingizni kiriting';
        return;
    }

    message.textContent = `Ma'lumotlar yangilanmoqda...`;

    try {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, job })
        });

        const userIndex = users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            users[userIndex] = { id, name, job };
        }

        message.textContent = `Ma'lumotlar yangilandi!`;
        renderUsers();
    } catch {
        message.textContent = 'Xatolik yuz berdi';
    }
};

createUserBtn.addEventListener('click', createUser);
updateBtn.addEventListener('click', updateUser);
