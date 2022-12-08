// TODO: use suspend image loading / https://sergiodxa.com/articles/react/suspense-image-loading

import { Box, Stack, Heading, HStack, Text, Input } from '@chakra-ui/react';
import { Radio, RadioGroup, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useReducer, useRef, useMemo } from 'react'
import styles from '../../styles/Home.module.css'
import { setDimensions, makeThumbnail, isValidHttpUrl, buildSrcUrl } from '../../utils/helpers'

export default function CustomizeImage() {

  // CANVAS STUFF
  const canvasRef = useRef(null);
  const contentfulImgRef = useRef(null);
  const playImgRef = useRef(null);

  const contentfulImgInit = {
      fit: 'fill',
      focus: 'face',
      width: '168',
      height: '168',
      urlBase: 'https://images.ctfassets.net/hg121nxz9t5c/1O12hxeZDolKBZP72c84SA/5b24a20ba00616101e08544861dd6755/iStock-629668612.jpg',
  };
  const [contentfulImgProperties, setContentfulImgProperties] = useState(contentfulImgInit);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [srcUrl, setSrcUrl] = useState(`${contentfulImgProperties.urlBase}?fit=${contentfulImgProperties.fit}&f=${contentfulImgProperties.focus}&w=${contentfulImgProperties.width}&h=${contentfulImgProperties.height}`);
  const[ isVideoThumbnail, setIsVideoThumbnail ] = useState(false);

  const playIconSize = useMemo(() => ({ width: 50, height: 50 }), []);
  // const playIconSize = useMemo(() => ({ width: 80, height: 80 }), []);

  useEffect(() => {

    const newSrc = buildSrcUrl(contentfulImgProperties);
    setSrcUrl(newSrc);
    
    // CANVAS STUFF
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    console.log(`canvasRef`);
    console.log(canvasRef);
    context.clearRect(0, 0, contentfulImgProperties.width, contentfulImgProperties.height);

    
    // MAKE SURE IMAGE IS LOADED FIRST
    // if(imgUrl is valid)
      // draw
    contentfulImgRef.current.onload
    console.log('attempting to draw...')
    console.log(contentfulImgRef.current.src)
    // if (isValidHttpUrl(contentfulImgRef.current.src))
    if (isValidHttpUrl(contentfulImgRef.current.src) && (imgLoaded == true)){
      console.log('attempting to draw image to canvas.')
      context.drawImage(contentfulImgRef.current, 0, 0);
    }
    else
      console.log('could not draw image to canvas.');

    const playIconParams = {
      img: playImgRef.current,
      canvasX: (contentfulImgProperties.width / 2) - (playIconSize.width / 2),
      canvasY: (contentfulImgProperties.height / 2) - (playIconSize.height / 2),
      sourceW: playIconSize.width,
      sourceH: playIconSize.height,
    };

    if (isVideoThumbnail) {
      context.drawImage(
        playIconParams.img, 
        playIconParams.canvasX,
        playIconParams.canvasY,
        playIconParams.sourceW,
        playIconParams.sourceH,
      )

    }

  }, [contentfulImgProperties, srcUrl, isVideoThumbnail, playIconSize, imgLoaded])

  return (
    <Box className={styles.container} bg='gray.50'>
      <Head>
        <title>Customize a Contentful Image</title>
        <meta name="description" content="Customize a Contentful Image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Customize a Contentful Image
        </h1>

        <HStack alignItems={'stretch'} my={4}>
          <Box className='urlInput' boxShadow='xs' p='6' rounded='md' bg='white'>
            <Heading>Set URL</Heading>
            <Text>This should start with <code>https://images.ctfassets.net/</code></Text>
            <Input mt={5} placeholder='https://images.ctfassets.net/your-image-here' 
              value={contentfulImgProperties.urlBase} 
              onChange={(e) => { setContentfulImgProperties({ ...contentfulImgProperties, urlBase: e.target.value }); console.log(e.target.value)}}></Input>
          </Box>
          <Box className='fitOptions' boxShadow='xs' p='6' rounded='md' bg='white'>
            <Heading>Set Resizing Behavior</Heading>
            <Text>Leave this on <code>fill</code> unless you know what you&rsquo;re doing.</Text>
            <RadioGroup mt={5} onChange={(e) => setContentfulImgProperties({ ...contentfulImgProperties, fit: e })} value={contentfulImgProperties.fit}>
              <Stack direction='row'>
                <Radio value="fill">fill</Radio>
                <Radio value='pad'>pad</Radio>
                <Radio value='scale'>scale</Radio>
                <Radio value='crop'>crop</Radio>
                <Radio value='thumb'>thumb</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box className='focusOptions' boxShadow='xs' p='6' rounded='md' bg='white'>
            <Heading>Set Focus</Heading>
            <RadioGroup mt={5} onChange={(e) => setContentfulImgProperties({ ...contentfulImgProperties, focus: e })} value={contentfulImgProperties.focus}>
              <Stack direction='row'>
                <Radio value='center'>center</Radio>
                <Radio value='face'>single face</Radio>
                <Radio value='faces'>multiple faces</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </HStack>
        <HStack alignItems={'stretch'} my={4}>
          <Box className='dimensionsOptions' boxShadow='xs' p='6' rounded='md' bg='white'>
            <Heading>Set Dimensions</Heading>
            <RadioGroup  onChange={(e) => {
              const dimensions = setDimensions(e); 
              setContentfulImgProperties({...contentfulImgProperties, ...dimensions});
            }}>
              <Stack direction='row'>
                <Radio value='1x1'>1:1</Radio>
                <Radio value='16x9'>16:9</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box className='miscOptions' boxShadow='xs' p='6' rounded='md' bg='white'>
            <Heading>Set Misc. Options</Heading>
            <CheckboxGroup onChange={(e) => makeThumbnail(e, setIsVideoThumbnail)}>
              <Stack direction='row'>
                <Checkbox value='videoThumbnail'>Video Thumbnail</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </HStack>
        <Box boxShadow='xs' p='6' rounded='md' my={8}>
          <Heading mb={6}>Video Thumbnail</Heading>
          {/* Below images are needed for canvas draw */}
          {/* <Box id='image-container' className={styles.overlapGrid}> */}
          <Box id='image-container' className={styles.overlapGrid} visibility='hidden' pos={'absolute'}>
              <picture>
                <img ref={contentfulImgRef} alt='' src={srcUrl} onLoad={()=>{console.log('IMAGE LOADED'); setImgLoaded(true)}} />
              </picture>
              <picture>
                <img 
                  ref={playImgRef} 
                  alt={'play icon'} 
                  style={{ 
                    width: `${playIconSize.width}px !important`,
                    height: `${playIconSize.height}px !important`
                  }}
                  src={`./play-button.svg`} />
              </picture>
          </Box>
            <Box>
              Save the image below and upload to Contentful.
            <canvas ref={canvasRef} width={contentfulImgProperties.width} height={contentfulImgProperties.height}>
              </canvas>
            </Box>
        </Box>
      </main>
    </Box>
  )
}