function StreamSourceClient() {
  this.webservice = "https://api.odb.to/";
}

StreamSourceClient.prototype.get = function(params, success) {
  let req = new XMLHttpRequest();
  let uri = "embed?imdb_id=";
  Object.keys(params).forEach(key => (uri += "&" + key + "=" + params[key]));
  req.open("GET", this.webservice + uri, true);
  req.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let regex = /<iframe[^>]+src="(https:\/\/[^">]+)"/g;
      let url = regex.exec(this.response);
      url[1] && success(url[1]);
    }
  };

  req.send();
};

StreamSourceClient.prototype.movie = function(id, success) {
  return this.get("GetStreamEmbedUrlByIMDBID", { imdb_id: id }, success);
};

StreamSourceClient.prototype.show = function(id, session, episode, success) {
  return this.get(
    "GetEpisodeStreamEmbedUrlByIMDBID",
    { imdb_id: id, s: session, e: episode },
    success
  );
};
