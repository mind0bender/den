export const getUserMedia: () => Promise<MediaStream> =
  (): Promise<MediaStream> => {
    return new Promise(
      (
        resolve: (value: MediaStream) => void,
        reject: (reason: any) => void
      ): void => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream: MediaStream): void => {
            resolve(stream);
          })
          .catch(reject);
      }
    );
  };

export const getDisplayMedia: () => Promise<MediaStream> =
  (): Promise<MediaStream> => {
    return new Promise(
      (
        resolve: (value: MediaStream) => void,
        reject: (reason: any) => void
      ): void => {
        navigator.mediaDevices
          .getDisplayMedia({
            video: true,
            audio: true,
          })
          .then((stream: MediaStream): void => {
            resolve(stream);
          })
          .catch(reject);
      }
    );
  };
