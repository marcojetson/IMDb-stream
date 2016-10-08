function VidSourceClient(key) {
  this.webservice = 'http://www.vidsourceapi.com/WebService.asmx/';
  this.key = key;
}

VidSourceClient.prototype.get = function (resource, params, success) {
  let req = new XMLHttpRequest();
  
  let uri = resource + '?redirecton=false&apikey=' + this.key;
  Object.keys(params).forEach(key => uri += '&' + key + '=' + params[key]);

  req.open('GET', this.webservice + uri, true);
  req.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      let url = this.response.match(/"EmbedUrl":\s*"([^"]+)"/);
      url[1] && success(url[1]);
    }
  };

  req.send();
};


VidSourceClient.prototype.movie = function (id, success) {
  return this.get('GetStreamEmbedUrlByIMDBID', {imdbid: id}, success);
};

VidSourceClient.prototype.show = function (id, season, episode,  success) {
  return this.get('GetEpisodeStreamEmbedUrlByIMDBID', {showimdbid: id, season, episode}, success);
};
