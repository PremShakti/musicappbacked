const express=require('express')

const Routerplay=express.Router()
let usetube=require('usetube')
const ytdl = require('ytdl-core');




// Routerplay.use('/play', (req, res, next) => {
//   console.log(req.query.url)
//     res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
//     res.setHeader('Content-Type', 'audio/mpeg');
//     next();
//   });



Routerplay.get('/play', async(req, res) => {
    const videoUrl = req.query.url; // Get the video URL from the query string
  


  try {
    res.setHeader('Content-Type', 'audio/mpeg');



    

    // Get video details including the thumbnail URL
    const videoInfo = await ytdl.getInfo(videoUrl);

    // Extract the thumbnail URL
    const thumbnailUrl = videoInfo.videoDetails.thumbnail.thumbnails[0].url;

    // Set the response header for the thumbnail URL
    res.setHeader('Access-Control-Expose-Headers', 'X-Thumbnail-URL');
    res.setHeader('X-Thumbnail-URL', thumbnailUrl);

    // Pipe the audio stream directly to the response
    ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
      format: 'mp3',
    }).pipe(res);


    // Get the audio stream
    // const audioStream = ytdl(videoUrl, {
    //   filter: 'audioonly',
    //   quality: 'highestaudio',
    //   format: 'mp3',
    // });

    // Calculate the total size of the audio file in bytes
    // const audioSize = await ytdl.getBasicInfo(videoUrl)
    //   .then(info => info.videoDetails.lengthSeconds * info.formats[0].bitrate / 8);

    // // Set the Content-Length header with the audio size
    // res.setHeader('Content-Length', audioSize);

    // // Pipe the audio stream directly to the response with a fixed buffer size
    // audioStream.pipe(res, { end: true, bufferSize: 64 * 1024 });



    // const videoInfo = await ytdl.getInfo(videoUrl);

    // // Extract the thumbnail URL
    // const thumbnailUrl = videoInfo.videoDetails.thumbnail.thumbnails[0].url;

    // res.setHeader('Content-Type', 'audio/mpeg');
    // res.setHeader('Transfer-Encoding', 'chunked');

    // // Pipe the audio stream directly to the response
    // ytdl(videoUrl, {
    //   filter: 'audioonly',
    //   quality: 'highestaudio',
    //   format: 'mp3',
    // }).pipe(res);
    // res.setHeader('X-Thumbnail-URL', thumbnailUrl);

   
  //   const audioStream = ytdl(videoUrl, { quality: 'highestaudio' });
  // console.log(audioStream)
  //   audioStream.on('error', (err) => {
  //     console.error('Error during audio streaming:', err);
  //     res.status(500).send('Error streaming audio');
  //   });
    
    

  //   audioStream.pipe(res);





  } catch (err) {
    console.error('Error retrieving video:', err);
    res.status(500).send('Error retrieving video');
  }
  });















// Define the route to handle streaming of audio
// Routerplay.get('/play', (req, res) => {
//   const videoUrl = req.query.url;

//   // Set the appropriate headers for streaming audio
//   res.setHeader('Content-Type', 'audio/mpeg');
//   res.setHeader('Accept-Ranges', 'bytes');

//   // Extract the audio stream from the YouTube video
//   const audioStream = ytdl(videoUrl, { quality: 'highestaudio' });

//   // Stream the audio to the client
  
//   audioStream.pipe(res)
// });





Routerplay.get('/search', async(req, res) => {
    const search = req.query.search;

try {
if(search){
  
const data=await usetube.searchVideo(search)
// const videoInfo = await usetube.getVideoInfo(videoUrl);
//     const thumbnailUrl = videoInfo.thumbnailUrl;
// console.log(thumbnailUrl)
// res.status(200)._construct({url:`https://www.youtube.com/watch?v=DP2T2W1IjA4`})
res.status(200).json({data:data})
}

    
} catch (error) {
    console.log(error)
}

})  

module.exports={
    Routerplay
}
