import React, { useEffect, useState } from "react";

export function ImgBase64({ setSrc: pushSrc, ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { setSrc: (src: string) => void; }) {

	const [src, setSrc] = useState('');

	useEffect(() => {
		if (!props.src) {
			setSrc('');
			return;
		}

		const img = new Image();
		img.onload = (() => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				return '';
			}
			ctx.drawImage(img, 0, 0);
			setSrc(canvas.toDataURL("image/jpeg"));
		});

		img.setAttribute('crossorigin', 'anonymous');
		img.src = props.src;

	}, [props.src]);

	useEffect(() => {
		pushSrc(src);
	}, [pushSrc, src]);


	if (!src) return null;

	return <img {...props} src={src} />;
}
