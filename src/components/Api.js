class Api {

    constructor(options) {
       this._baseUrl = options.baseUrl;
       this._headers = options.headers;
    }

    getInitialCards() {//закбираем карточки с сервера
       return  fetch(this._baseUrl+'/cards',{
            method: 'GET',
            headers: this._headers
        })
           .then(res => {
               if (res.ok) {
                   return res.json(); // возвращаем результат работы метода и идём в следующий then
               }

               // если ошибка, отклоняем промис
               return Promise.reject(`Ошибка: ${res.status}`);
           });

    }

    getInitialInfo () {// забираем данные пользователя с сервера
        return fetch(this._baseUrl+'/users/me',{
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json(); // возвращаем результат работы метода и идём в следующий then
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
      .then(res => {
            if (res.ok) {
                return res.json(); // возвращаем результат работы метода и идём в следующий then
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
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
            .then(res => {
                if (res.ok) {
                    return res.json(); // возвращаем результат работы метода и идём в следующий then
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteCard (cardId){ // удаляем карточку
        return  fetch(this._baseUrl+'/cards/'+cardId, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json(); // возвращаем результат работы метода и идём в следующий then
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    editAvatar (avatar) { // меняем аватар
        return  fetch(this._baseUrl+'/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json(); // возвращаем результат работы метода и идём в следующий then
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }
    likeCard (isLike, cardId) { // лайкам и дизлайкам карточку
        if (isLike == false) {
            return  fetch(this._baseUrl+'/cards/likes/'+cardId, {
                method: 'PUT',
                headers: this._headers
            })
                .then(res => {
                    if (res.ok) {
                        return res.json(); // возвращаем результат работы метода и идём в следующий then
                    }

                    // если ошибка, отклоняем промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                });

        } else {
            return  fetch(this._baseUrl+'/cards/likes/'+cardId, {
                method: 'DELETE',
                headers: this._headers
            })
                .then(res => {
                    if (res.ok) {
                        return res.json(); // возвращаем результат работы метода и идём в следующий then
                    }

                    // если ошибка, отклоняем промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                });
        }


    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '6fb84545-6862-41b6-acf7-dd6745b9ebe0',
        'Content-Type': 'application/json'
    }
});

export {api};