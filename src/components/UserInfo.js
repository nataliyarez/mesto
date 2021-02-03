
class UserInfo {
    constructor({name, job}) {

        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }
    getUserInfo() { // возвращает объект с данными
       return {name:this._name.textContent, job: this._job.textContent};

    }
    setUserInfo (name, job) { // принимает и добовляет данные нас страницу
        this._name.textContent = name;
        this._job.textContent = job;
    }
}

export {UserInfo};