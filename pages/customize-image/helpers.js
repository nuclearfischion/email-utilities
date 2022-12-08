const setDimensions = (value) => {
  console.log(`value`)
  console.log(value)

  if (value == '1x1') {
    const w = 168;
    const h = 168;
    return {width: w, height: h};
    // setContentfulImgProperties({ ...contentfulImgProperties, width: w, height: h });
  }
  else if (value == '16x9') {
    const w = 640;
    const h = 360;
    return {width: w, height: h};
    // setContentfulImgProperties({ ...contentfulImgProperties, width: w, height: h });
  }
};

const makeThumbnail = (value, setIsVideoThumbnail) => {
  if (value == 'videoThumbnail') {
    console.log(`its a video thumbnail!`);
    setIsVideoThumbnail(true);
  }
  else {
    console.log(`its a video thumbnail!`);
    setIsVideoThumbnail(false);
  }
};

const isValidHttpUrl = (string) => {
  // let url;
  try {
    const url = new URL(string);
  }
  catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

const buildSrcUrl = (imgProperties) => {
  const { urlBase, fit, focus, width, height } = imgProperties;

  // if fit == fill, then add focus
  let newSrc = `${urlBase}?fit=${fit}&w=${width}&h=${height}`;
  // if (fit === 'fill')
    newSrc += `&f=${focus}`;

  return newSrc;
};

export { setDimensions, makeThumbnail, isValidHttpUrl, buildSrcUrl };