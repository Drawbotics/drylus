import SparkMD5 from 'spark-md5';

interface Headers {
  [key: string]: string;
}

async function request(
  method: string,
  url: string,
  data: any,
  extra: { onProgress?: (e: ProgressEvent) => void; headers?: Headers } = {},
) {
  const { headers = {}, onProgress } = extra;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers != null) {
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
    }

    xhr.addEventListener('load', (e: ProgressEvent<any>) => {
      let data = null;
      try {
        data = JSON.parse(e.target?.responseText);
      } catch (err) {
        data = e.target.responseText;
      }
      return resolve(data);
    });
    xhr.addEventListener('error', (err) => reject(err));
    xhr.upload.addEventListener('progress', onProgress as any);

    if (headers['Content-Type'] === 'application/json') {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send(data);
    }
  });
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-z0-9.]/gi, '_');
}

function _readAsArrayBuffer(file: Blob): Promise<Buffer> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (e: ProgressEvent<any>) => {
      resolve(e.target.result);
    };
    reader.readAsArrayBuffer(file);
  });
}

async function _getFileChecksum(file: File) {
  const CHUNK_SIZE = 2097152; // Read in chunks of 2MB
  const md5 = new SparkMD5.ArrayBuffer();

  let start = 0;
  while (start < file.size) {
    const end = start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE;
    const fileBuffer = await _readAsArrayBuffer(file.slice(start, end));
    md5.append(fileBuffer);
    start = end;
  }

  return md5.end(true);
}

interface AmazonBlob {
  filename: string;
  byte_size: number;
  checksum: string;
  content_type: string;
}

async function _parseFile(file: File, sanitize: (filename: string) => string): Promise<AmazonBlob> {
  return {
    filename: sanitize(file.name),
    byte_size: file.size,
    checksum: btoa(await _getFileChecksum(file)),
    content_type: file.type,
  };
}

export interface SigningResult {
  direct_upload: { url: string; headers: Headers };
  signed_id: string;
  filename: string;
  content_type: string;
  id: string;
}

async function _signBlob(signingUrl: string, blob: AmazonBlob): Promise<SigningResult> {
  return (await request(
    'POST',
    signingUrl,
    { blob },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )) as Promise<SigningResult>;
}

async function _directUpload(
  blobSignature: SigningResult,
  file: File,
  onProgress?: (e: ProgressEvent) => void,
) {
  const { url, headers } = blobSignature.direct_upload;
  return await request('PUT', url, file, {
    headers,
    onProgress,
  });
}

async function _uploadFile(
  file: File,
  signingUrl: string,
  extra: {
    sanitize: (filename: string) => string;
    onProgress?: (file: File, e: ProgressEvent) => void;
  },
) {
  const { sanitize, onProgress } = extra;
  const blob = await _parseFile(file, sanitize);
  const signingResult = await _signBlob(signingUrl, blob);
  const result = await _directUpload(
    signingResult,
    file,
    onProgress != null ? (e) => onProgress(file, e) : () => {},
  );
  return { blob, signingResult, result };
}

interface UploadedFile {
  file: File;
  signingResult?: SigningResult;
}

export async function uploadFile(
  file: File,
  signingUrl: string,
  extra: {
    onStart?: (file: File) => void;
    onProgress?: (file: File, e: ProgressEvent) => void;
    onFinish?: (file: File, signingResult?: SigningResult, result?: any) => void;
    onError?: (file: File, error: Error) => void;
    sanitize?: (filename: string) => string;
  },
): Promise<UploadedFile> {
  const { onStart, sanitize, onProgress, onError, onFinish } = extra;

  if (onStart != null) {
    onStart(file);
  }

  let signingResult;

  try {
    const uploadResult = await _uploadFile(file, signingUrl, {
      sanitize: (name) => (sanitize ? sanitizeFilename(sanitize(name)) : sanitizeFilename(name)),
      onProgress,
    });
    signingResult = uploadResult.signingResult;
  } catch (err) {
    if (onError != null) {
      onError(file, err);
    }
  }

  if (onFinish != null) {
    onFinish(file, signingResult);
  }

  return { file, signingResult };
}

export async function uploadFiles(
  files: FileList,
  signingUrl: string,
  extra: {
    onInit?: (files: FileList) => void;
    onStart?: (file: File) => void;
    onProgress?: (file: File, e: ProgressEvent) => void;
    onFinish?: (file: File, signingResult?: SigningResult, result?: any) => void;
    onError?: (file: File, error: Error) => void;
    onComplete?: (files: Array<UploadedFile>) => void;
    sanitize?: (filename: string) => string;
  },
) {
  const { onInit, onComplete, ...rest } = extra;

  if (onInit != null) {
    onInit(files);
  }

  const promises = [...files].map((file) => uploadFile(file, signingUrl, rest));
  const uploadedFiles: Array<UploadedFile> = await Promise.all(promises);

  if (onComplete != null) {
    onComplete(uploadedFiles);
  }

  return uploadedFiles;
}
