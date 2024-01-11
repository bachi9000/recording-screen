const $button = document.querySelector('button')

if ($button) {
  $button.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } },
      audio: true // Enable audio recording
    })
    const mediarecorder = new MediaRecorder(media, {
      mimeType: 'video/webm;codecs=vp8,opus',
      audioBitsPerSecond: 128000 // Set audio bitrate to 128 kbps
    })
    mediarecorder.start()

    const [video] = media.getVideoTracks()
    video.addEventListener("ended", () => {
      mediarecorder.stop()
    })

    mediarecorder.addEventListener("dataavailable", (e) => {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(e.data)
      link.download = "captura.webm"
      link.click()
    })
  })
} else {
  console.error("Button element not found.")
}