// @flow

// Infomation: https://github.com/react-component/upload#customrequest

export type CustomRequestArgs = {
  onProgress: (event: { percent: number }) => void,
  onError: (event: Error, body?: Object) => void,
  onSuccess: (body: Object) => void,
  data: Object,
  filename: String,
  file: File,
  withCredentials: Boolean,
  action: String,
  headers: Object
};

export type UploadConfig = {
  accept?: string,
  action?: string, // the form url,
  beforeUpload?: (file: File, fileList: Array<File>) => boolean | Promise<*>,
  customRequest?: CustomRequestArgs => void,
  data?: Object | (File => Object),
  defaultFileList?: Array<Object>,
  disabled?: boolean,
  fileList?: Array<Object>,
  headers?: Object,
  listType?: string,
  multiple?: boolean,
  name?: string,
  // prettier-ignore
  showUploadList?: boolean
    | {
        showPreviewIcon?: boolean,
        showRemoveIcon?: boolean
      },
  supportServerRender?: boolean,
  withCredentials?: boolean,
  onChange?: Function,
  onPreview?: File => void,
  onRemove?: File => boolean | Promise<*>
};
