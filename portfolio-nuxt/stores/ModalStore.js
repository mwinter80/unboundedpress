import {defineStore} from "pinia";

export const useModalStore = defineStore("ModalStore", {
    state: () => ({"type": "", "aspect":"", "isOpen":false, "bucket":"", "image_ids":"", "vimeo_trackid":""}),
    actions: {
        setModalProps(type, aspect, isOpen, bucket, image_ids, vimeo_trackid) {
          this.type = type
          this.aspect = aspect
          this.isOpen = isOpen
          this.bucket = bucket
          this.image_ids = image_ids
          this.vimeo_trackid = vimeo_trackid
        }
      }
})