# Bitbird Visualizer

On Saturday, May 30th 2020, the record label _[bitbird](https://bitbirdofficial.com/)_ hosted a multi-artist [streaming event](https://twitter.com/bitbird/status/1265343585739833348) on SiriusXM.

Staff at the label were contractually barred from restreaming the event, but fans had no such restrictions, so a few hours beforehand, I volunteered to stream audio of the event to the label's Discord server.

The stream included both audio and video, so I created a visualizer that fills the record label's logo with its brand color based on the volume of the user's microphone input.
During the event, I used [Virtual Audio Cable](https://vac.muzychenko.net/en/) to redirect my speaker output to a dummy device, then set that device as my microphone in the browser; this allowed the visualizer to reflect the audio coming from my PC.

Many fans and followers of bitbird strongly identify with its bird logo and related brand imagery, so this visualizer served to add a personal touch to what would otherwise have been an ordinary stream.
At the peak of the event, 38 viewers were simultaneously watching my stream and its visuals. Several viewers and multiple staff members messaged me during and after the event to compliment me on my creation.

The [public version](https://bitbird-visualizer.now.sh/) hosted on Vercel uses the user's microphone input by default, however this can be changed using VAC's Audio Repeater utility and your browser's settings as I described above.
