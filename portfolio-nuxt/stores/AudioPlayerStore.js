import {defineStore} from "pinia";

export const useAudioPlayerStore = defineStore("AudioPlayerStore", {
    state: () => ({"soundcloud_trackid": "1032587794"}),
    actions: {
        setSoundCloudTrackID(trackid) {
          this.soundcloud_trackid = trackid
        }
      }
})