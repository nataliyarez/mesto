class Api {

    constructor(options) {
       this._baseUrl = options.baseUrl;
       this._headers = options.headers;
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json(); // возвращаем результат работы метода и идём в следующий then
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {//закбираем карточки с сервера
       return  fetch(this._baseUrl+'/cards',{
            method: 'GET',
            headers: this._headers
        })
           .then(this._getResponseData);

    }

    getInitialInfo () {// забираем данные пользователя с сервера
        return fetch(this._baseUrl+'/users/me',{
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData);
    }

    editInfo (name, about){ // меняем данные пользователя
       return  fetch(this._baseUrl+'/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
           .then(this._getResponseData);
    }
    addCard (name, link) { // добавляем новую карточку
        return  fetch(this._baseUrl+'/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponseData);
    }
    deleteCard (cardId){ // удаляем карточку
        return  fetch(this._baseUrl+'/cards/'+cardId, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData);
    }

    editAvatar (avatar) { // меняем аватар
        return  fetch(this._baseUrl+'/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._getResponseData);

    }
    likeCard (isLike, cardId) { // лайкам и дизлайкам карточку
        if (isLike === false) {
            return  fetch(this._baseUrl+'/cards/likes/'+cardId, {
                method: 'PUT',
                headers: this._headers
            })
                .then(this._getResponseData);

        } else {
            return  fetch(this._baseUrl+'/cards/likes/'+cardId, {
                method: 'DELETE',
                headers: this._headers
            })
                .then(this._getResponseData);
        }


    }

}



export {Api};