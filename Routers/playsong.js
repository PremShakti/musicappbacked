const express=require('express')

const Routerplay=express.Router()
let usetube=require('usetube')
const ytdl = require('ytdl-core');

const ffmpeg = require('fluent-ffmpeg');


Routerplay.use('/play', (req, res, next) => {
  console.log(req.query.url)
    res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
    res.setHeader('Content-Type', 'audio/mpeg');
    next();
  });



Routerplay.get('/play', (req, res) => {
    const videoUrl = req.query.url; // Get the video URL from the query string
  
    // Set the response headers to stream the converted MP3 file
//     res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
//     res.header('Content-Type', 'audio/mpeg');
//       const audioStream = ytdl(videoUrl, { quality: 'highestaudio' });
//   audioStream.pipe(res)

  try {
    const audioStream = ytdl(videoUrl, { quality: 'highestaudio' });
  
    audioStream.on('error', (err) => {
      console.error('Error during audio streaming:', err);
      res.status(500).send('Error streaming audio');
    });
  
    audioStream.pipe(res);
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
