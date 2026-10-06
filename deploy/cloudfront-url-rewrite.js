// CloudFront Function (viewer-request). The static export writes /team as
// team.html, but visitors (and Google) use the clean URL /team, so map it.
// Runtime: cloudfront-js-2.0. Attach to the default behaviour as a viewer request.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === "/" || uri === "") {
    request.uri = "/index.html";
  } else if (uri.endsWith("/")) {
    // /team/ -> /team (one canonical URL per page)
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: uri.slice(0, -1) } },
    };
  } else if (uri.indexOf(".", uri.lastIndexOf("/")) === -1) {
    request.uri = uri + ".html";
  }
  return request;
}
