import React from "react";
import useCopy from "use-copy";

export default function UseCopy({ textToCopy, children, ...props }) {
  const [copied, copy, setCopied] = useCopy(textToCopy);

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <span style={{ cursor: "pointer" }} {...props} onClick={copyText}>
      {copied ? "Copied" : children}
    </span>
  );
}
