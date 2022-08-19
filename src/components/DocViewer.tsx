import React, { FC } from "react";
import cls from "classnames";

export interface Props {
  className?: string;
  ext?: string;
  src?: string;
}

const Error: FC<{ error: string; className: string }> = ({
  error,
  className,
}) => {
  return <div className={className}>{error}</div>;
};

const DocViewer: FC<Props> = ({ ext, className: classNameProps, src }) => {
  const className = cls(
    classNameProps,
    "flex justify-center items-center text-lg"
  );
  if (!src) {
    return <Error className={className} error="文件路径错误，无法预览！" />;
  } else if (ext !== "pdf" || !src?.includes("pdf")) {
    return <Error className={className} error="该格式文件暂不支持预览！" />;
  }
  // return  <PDFViewer src={src} />

  return <iframe className={className} src={src} />;
};

export default DocViewer;
