import {defineStore} from "pinia";

export const useModalStore = defineStore("ModalStore", {
    state: () => ({"type": "", "aspect":"", "isOpen":false, "bucket":"", "gallery":"", "vimeo_trackid":""}),
    actions: {
        setModalProps(type, aspect, isOpen, bucket, gallery, vimeo_trackid) {
          this.type = type
          this.aspect = aspect
          this.isOpen = isOpen
          this.bucket = bucket
          this.gallery = gallery
          this.vimeo_trackid = vimeo_trackid
        }
      }
})