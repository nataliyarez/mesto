
class UserInfo {
    constructor({name, job}) {

        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }
    getUserInfo() { // возвращает объект с данными
       return {name:this._name.textContent, job: this._job.textContent};

    }
    setUserInfo () { // принимает и добовляет данные нас страницу
        this._name.textContent = document.querySelector('#name').value;
        this._job.textContent = document.querySelector('#job').value;
    }
}

export {UserInfo};