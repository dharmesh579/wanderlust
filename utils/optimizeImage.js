function optimizeImage(url) {
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/w_250,c_fill/");
  } else if (url.includes("unsplash.com")) {
    return url.replace(/w=\d+/, "w=250");
  }
  return url;
}

module.exports = optimizeImage;
