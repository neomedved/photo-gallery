export default class Api {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  async template (url) {
    return fetch(`${this.baseUrl}/${url}`, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Loading Error'));
      });
  }

  async getUsers () {
    return this.template('users');
  }

  async getUser (userId) {
    return this.template(`users/${userId}`);
  }

  async getAlbums (userId) {
    return this.template(`users/${userId}/albums`);
  }

  async getAlbum (albumId) {
    return this.template(`albums/${albumId}`);
  }

  async getPhotos (albumId) {
    return this.template(`albums/${albumId}/photos`);
  }
}
