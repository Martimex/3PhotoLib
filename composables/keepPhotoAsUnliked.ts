import type PhotoResponseModel from '@/types/responseModel_photo';

export default function keepPhotoAsUnliked(photoRef: globalThis.Ref<boolean>, photoData: PhotoResponseModel) {

    const { photosToRemoveArray_modify, photosToRemoveArray_get  } = useStatusStore();

    photosToRemoveArray_modify(photoData);
    photoRef.value = true;
}