import axios from 'axios';
import heic2any from 'heic2any';

export const API = {
  uploadImageToImgbb: async (file: any) => {
    try {
      let jpegData;

      if (file.type === 'image/heic') {
        jpegData = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
        })) as any;
      }
      const jpegFile = new File([jpegData ?? file], `${file.name}.jpg`, {
        type: 'image/jpeg',
      });
      const formData = new FormData();
      formData.append('image', jpegFile);
      formData.append('isGalleryImage', 'true');
      let response = axios
        .post(
          `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_KEY}`,
          formData
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error;
        });

      return response;
    } catch (err: any) {
      return err.message;
    }
  },
};
