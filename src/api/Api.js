export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  template(url) {
    return fetch(`${this.baseUrl}/${url}`, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res);
        return Promise.reject(new Error('Loading Error'));
      });
  }

  getUsers() {
    return this.template('users');
  }

  getUser(userId) {
    return this.template(`users/${userId}`);
  }

  getAlbums(userId) {
    return this.template(`albums?userId=${userId}`);
  }

  getAlbum(albumId) {
    return this.template(`albums/${albumId}`);
  }


  getPhotos(albumId) {
    return this.template(`photos?albumId=${albumId}`);
  }
};
