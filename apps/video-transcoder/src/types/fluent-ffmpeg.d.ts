declare module 'fluent-ffmpeg' {
  import { ChildProcess } from 'child_process'

  interface FfmpegCommand {
    input(file: string): FfmpegCommand
    output(file: string): FfmpegCommand
    outputOptions(options: string[]): FfmpegCommand // <-- isso aqui resolve o erro 2
    on(event: string, callback: (...args: any[]) => void): FfmpegCommand
    run(): ChildProcess
  }

  interface FfmpegStatic {
    (file?: string): FfmpegCommand
    setFfmpegPath(path: string): void // <-- isso aqui resolve o erro 1
  }

  const ffmpeg: FfmpegStatic
  export = ffmpeg
}
