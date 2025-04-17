import type { EventsType, LocalFileType } from "./type"

declare interface BySandboxOptionsType {

}

export class BySandbox {
  static readonly version = "0.0.2"

  el!: HTMLDivElement
  iframe!: HTMLIFrameElement
  loading = false
  fileList!: Required<LocalFileType>[]
  events!: Required<EventsType>

  constructor(options: BySandboxOptionsType) {

    this.init().then(() => {})
  }

  private async init() {
    
  }

  

}
