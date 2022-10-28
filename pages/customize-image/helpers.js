function setDimensions(value) {
  console.log(`value`)
  console.log(value)

  if (value == '1x1') {
    const w = 150;
    const h = 150;
    return {width: w, height: h};
    // setContentfulImgProperties({ ...contentfulImgProperties, width: w, height: h });
  }
  else if (value == '16x9') {
    const w = 640;
    const h = 360;
    return {width: w, height: h};
    // setContentfulImgProperties({ ...contentfulImgProperties, width: w, height: h });
  }
}

function makeThumbnail(value, setIsVideoThumbnail) {
  if (value == 'videoThumbnail') {
    console.log(`its a video thumbnail!`);
    setIsVideoThumbnail(true);
  }
  else {
    console.log(`its a video thumbnail!`);
    setIsVideoThumbnail(false);
  }
}

function isValidHttpUrl(string) {
  // let url;
  try {
    const url = new URL(string);
  }
  catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

function buildSrcUrl(imgProperties) {
  const { urlBase, fit, focus, width, height } = imgProperties;

  // if fit == fill, then add focus
  let newSrc = `${urlBase}?fit=${fit}&w=${width}&h=${height}`;
  if (fit === 'fill')
    newSrc += `&f=${focus}`;

  return newSrc;
}

export { setDimensions, makeThumbnail, isValidHttpUrl, buildSrcUrl, };